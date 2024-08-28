import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from '@modules/orders/typeorm/entities/Order';
import OrdersRepository from "@modules/orders/typeorm/repositories/OrdersRepository";

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrdersRepository);
    const order = await orderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

export default ShowOrderService;
