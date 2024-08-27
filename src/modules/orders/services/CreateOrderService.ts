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
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customerRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const existsCustomer = await customerRepository.find(customer_id);

    if (existsCustomer) {
      throw new AppError('Could not find any customer with the given id.');
    }

    const existsProducts = await productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const existsProductsIds = existsProducts.map((product) => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id)
    );

    if (!checkInexistentProducts.length) {
      throw new AppError(`Could not find any product ${checkInexistentProducts[0].id}.`);
    }

    const quantityAvailable = products.filter(
      product => existsProducts.filter(p => p.id === product.id)[0].quantity < product.quantity,
    )

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${checkInexistentProducts[0].quantity}
         is not available for ${checkInexistentProducts[0].id}.`
      );
    }

  }
}

export default CreateOrderService;
