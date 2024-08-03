import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/Users";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { compare, hash } from "bcryptjs";

interface IRequest {
  email: string;
  password: string;
}

// interface IResponse {
//   user: User;
// }

class CreateSessionService {
  public async execute({ email, password}: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await  usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const hashedPassword = await compare(password, user.password);

    if (!hashedPassword) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    return user;
  }
}

export default CreateSessionService;
