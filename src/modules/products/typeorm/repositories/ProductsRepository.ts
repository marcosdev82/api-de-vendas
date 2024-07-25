import { Entity, EntityRepository, Repository} from 'typeorm';
import Product from '../entities/Product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  findByName(firstName: string, lastName: string) {
    return this.findOne({firstName, lastName});
  }
}

