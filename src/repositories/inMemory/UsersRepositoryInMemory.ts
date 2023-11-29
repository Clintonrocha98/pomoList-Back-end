import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepositories";
import { v4 as uuid } from "uuid";

class UsersRepositoryInMemory implements IUsersRepository {
  public users: User[] = [];

  async create(user: User): Promise<User> {
    Object.assign(user, {
      id: uuid(),
    });
    this.users.push(user);
    return user;
  }

  async exists(email: string): Promise<boolean> {
    const userExists = this.users.some((user) => user.email === email);
    return userExists;
  }
  async findUser(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
}
export { UsersRepositoryInMemory };
