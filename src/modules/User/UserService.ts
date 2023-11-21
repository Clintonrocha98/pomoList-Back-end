import { hash } from "bcryptjs";
import { User } from "../../entities/User";
import { BadRequestError, UnauthorizedError } from "../../helpers/api-errors";
import { IUsersRepository } from "../../repositories/IUsersRepositories";

import { validate } from "class-validator";
import formatValidationErrors from "../../utils/formatValidationErrors";

class UserService {
  constructor(private usersRepository: IUsersRepository) {}

  async create(userInput: { name: string; email: string; password: string }) {
    const dto = User.create(userInput);

    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      throw new BadRequestError(formatValidationErrors(validationErrors));
    }
    const userAlreadyExists = await this.usersRepository.exists(
      userInput.email
    );
    if (userAlreadyExists) {
      throw new UnauthorizedError("Invalid user!");
    }

    const passwordHash = await hash(userInput.password, 8);

    const newUser = await this.usersRepository.create({
      name: userInput.name,
      email: userInput.email,
      password: passwordHash,
    });

    return newUser;
  }
}

export { UserService };
