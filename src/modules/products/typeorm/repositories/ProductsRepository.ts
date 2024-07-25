import { EntityRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    // Usar await para garantir que a chamada ao banco de dados seja concluída
    const product = await this.findOne({
      where: {
        name,
      },
    });

    return product;
  }
}
export default ProductRepository;
