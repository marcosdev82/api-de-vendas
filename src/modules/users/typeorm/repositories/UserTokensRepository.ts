import { EntityRepository, Repository } from "typeorm";
import UserToken from "../entities/UsersToken";

@EntityRepository(UserToken)
class UserTokensRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  public async generate_id(id: string): Promise<UserToken | undefined> {

    const userToken = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  }
}

export default UsersRepository;
