import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class ListProductService {
  public async execute(): Promise<Product[]>{
    const productsRepository = getCustomRepository(ProductRepository);

    const products =  productsRepository.find();

    return products;
  }
}

export default ListProductService;
