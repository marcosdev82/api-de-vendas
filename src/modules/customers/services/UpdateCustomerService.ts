import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({
    id,
    name,
    email,
  }: IRequest): Promise<Customer> {
    const custumersRepository = getCustomRepository(CustomersRepository);

    const customer = await custumersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const customerExists = await custumersRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email.');
    }

    customer.name = name;
    customer.email = email;

    await custumersRepository.save(customer)

    return customer;
  }
}

export default UpdateCustomerService;
