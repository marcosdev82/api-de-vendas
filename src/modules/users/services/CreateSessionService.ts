import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/Users";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password}: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await  usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const hashedPassword = await compare(password, user.password);

    if (!hashedPassword) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, '5dfa190cc7bfad2ca82dc88ac292b302', {
      subject: user.id,
      expiresIn: '1d',
    })

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
