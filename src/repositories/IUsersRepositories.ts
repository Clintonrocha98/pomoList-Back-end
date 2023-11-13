import { userDto } from "../dto/userDto";
import { User } from "../entities/User";

type emailType = userDto["email"];

interface IUsersRepository {
  create(user: userDto): Promise<User>;
  exists(email: emailType): Promise<boolean>;
}

export { IUsersRepository };
