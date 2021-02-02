import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import ProductsRepository from '../repositories/ProductsRepository';
import CreateProductService from '../services/CreateProductService';

const productsRouter = Router();

productsRouter.get('/', async (request, response) => {
  const productsRepository = getCustomRepository(ProductsRepository);
  const products = await productsRepository.find();

  return response.json(products);
});

productsRouter.post('/', async (request, response) => {
  try {
    const { url, date } = request.body;
    const parsedDate = parseISO(date);
    const createProduct = new CreateProductService();
    
    const product = await createProduct.execute({
      url,
      date: parsedDate,
    });

    return response.json(product);
  
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default productsRouter;