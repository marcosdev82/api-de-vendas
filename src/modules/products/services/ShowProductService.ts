import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

class ListProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    // Usar await para garantir que a chamada ao banco de dados seja concluída
    const product = await productsRepository.findOneById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}

export default ListProductService;
