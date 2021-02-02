import { startOfHour, getHours, getMinutes } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import axios from 'axios';
import cheerio from 'cheerio';

import Product from '../models/Product';
import ProductsRepository from '../repositories/ProductsRepository';

interface Request {
  url: string;
  date: Date;
}

class CreateProductService {

  public async execute({ url, date }: Request): Promise<Product> {
    try {
    const productsRepository = getCustomRepository(ProductsRepository);

    const findProductInSameURL = await productsRepository.findByURL(
      url,
    );

    if (findProductInSameURL && getHours(findProductInSameURL.date) == getHours(date)) {
       return findProductInSameURL;
    }

    const productDate = startOfHour(date);
    let title;
    let description;
    let image;
    let price;
    let res = await axios.get(url);
    let html = res.data;
    const $ = await cheerio.load(html);

    if(url.indexOf("saraiva") != -1){
      title = $('meta[property="og:title"]').attr('content');
      description = $('meta[property="og:title"]').attr('content');
      image = $('meta[itemprop="image"]').attr('content');
      price = $('meta[property="product:price:amount"]').attr('content');
    }

    if(url.indexOf("americanas") != -1){
        //console.log($('span[id="priceblock_ourprice"]').text().trim());
        //console.log($('div .a-dynamic-image').attr('src'));
        //console.log($('div .product-title-word-break').text().trim());
        title = $('meta[name="description"]').attr('content');
        description = $('meta[name="description"]').attr('content');
        image = $('picture img').attr('src');
        price = $('div.priceSales').text();
    }

    if(url.indexOf("amazon") != -1){
      let tempPrice = $('span[id="priceblock_ourprice"]').text().trim();
      let newPrice = tempPrice.replace('R$','').replace(',','.');
      title = $('div .product-title-word-break').text();
      description = $('div .product-title-word-break').text();
      image = $('div .a-dynamic-image').attr('src');      
      price = newPrice;
    }
    
    const product = productsRepository.create({
      title: title,
      description: description,
      image: image,
      url: url,
      price: price,
      date: productDate,
    });

    await productsRepository.save(product);
    
    return product;
    
    } catch {
      console.error(
        `ERROR: Ocorreu um erro ao tentar buscar a URL: ${url}`
      );
    }
  }
}

export default CreateProductService;