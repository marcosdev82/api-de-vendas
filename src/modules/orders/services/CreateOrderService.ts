import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";
import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import ProductRepository from "@modules/products/typeorm/repositories/ProductsRepository";

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer: string;
  products: IProduct[];
}


class CreateOrderService {
  public async execute({ customer_id, products}: IRequest) Promise<Order>{
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customerRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);


    const customerExists = await productsRepository.findById(customer_id);

    if (customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }
  }
}

export default CreateOrderService;
