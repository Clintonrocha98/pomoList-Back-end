import { validate } from "class-validator";
import { Login } from "../../entities/Login";
import { NotFoundError, UnauthorizedError } from "../../helpers/api-errors";
import { IUsersRepository } from "../../repositories/IUsersRepositories";
import formatValidationErrors from "../../utils/formatValidationErrors";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

class LoginService {
  constructor(private usersRepository: IUsersRepository) {}

  async create(email: string, password: string) {
    const login = Login.create(email, password);

    const validateLogin = await validate(login);

    if (validateLogin.length > 0) {
      throw new UnauthorizedError(formatValidationErrors(validateLogin));
    }

    const userAlreadyExists = await this.usersRepository.exists(email);

    if (!userAlreadyExists) {
      throw new NotFoundError("Invalid user!");
    }
    const user = await this.usersRepository.findUser(email);
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedError("Invalid email or password.");
    }

    const token = sign({}, process.env.SECRET_JWT, {
      subject: user.id,
    });

    const data = { token, id: user.id };
    
    return data;
  }
}

export { LoginService };
