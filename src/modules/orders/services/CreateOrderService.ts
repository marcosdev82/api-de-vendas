import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import ProductRepository from "@modules/products/typeorm/repositories/ProductsRepository";
import OrdersRepository from "@modules/orders/typeorm/repositories/OrdersRepository";

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}


class CreateOrderService {
  public async execute({ customer_id, products}:IRequest): Promise<Order> {
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
