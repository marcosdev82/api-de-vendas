import { EntityRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | null> {
    // Usar await para garantir que a chamada ao banco de dados seja concluída
    const product = await this.findOne({
      where: {
        name,
      },
    });

    return product;
  }
}
