import { User } from "../../entities/User";
import { UnauthorizedError } from "../../helpers/api-errors";
import { IUsersRepository } from "../../repositories/IUsersRepositories";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}
class UserService {
  constructor(private usersRepository: IUsersRepository) {}

  async create({ email, name, password }: IUserRequest) {
    const userAlreadyExists = await this.usersRepository.exists(email);
    if (userAlreadyExists) {
      throw new UnauthorizedError("Invalid user.");
    }
    const userCreate = User.create({ name, email, password });
    const user = await this.usersRepository.create(userCreate);
    return user;
  }
}

export { UserService };
