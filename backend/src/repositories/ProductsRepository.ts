import Product from '../models/Product';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Product)
class ProductsRepository extends Repository<Product> {

  public async findByDate(date: Date): Promise<Product | null> {
    const findProduct = await this.findOne({
      where: { date },
    });

    return findProduct || null;
  }

  public async findByURL(url: string): Promise<Product | null> {
    const findProduct = await this.findOne({
      where: { url },
    });

    return findProduct || null;
  }

}

export default ProductsRepository;