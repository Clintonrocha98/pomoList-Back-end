import { User } from "../../entities/User";
import { BadRequestError, UnauthorizedError } from "../../helpers/api-errors";
import { UsersRepositoryInMemory } from "../../repositories/inMemory/UsersRepositoryInMemory";
import { UserService } from "./UserService";

const usersRepository = new UsersRepositoryInMemory();
const createUserService = new UserService(usersRepository);

describe("Create user", () => {

  it("It should be possible to create a new user", async () => {
    const userData: User = {
      name: "teste 1",
      email: "teste1@teste.com",
      password: "123456789",
    };
    const user = await createUserService.create(userData);

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create an existing user", async () => {
    const userData: User = {
      name: "teste2",
      email: "teste2@teste.com",
      password: "123456789",
    };
    await createUserService.create(userData);

    await expect(createUserService.create(userData)).rejects.toThrow(
      new UnauthorizedError("Invalid user!")
    );
  });
  it("It should not be possible to create a user with an empty name", async () => {
    const userData: User = {
      name: "",
      email: "teste3@teste.com",
      password: "123456789",
    };
    await expect(createUserService.create(userData)).rejects.toThrow(
      new BadRequestError(
        "Validation failed. Details: name: name should not be empty"
      )
    );
  });
  it("It should not be possible to create a user with an invalid email address", async () => {
    const userData: User = {
      name: "teste4",
      email: "",
      password: "123456789",
    };
    await expect(createUserService.create(userData)).rejects.toThrow(
      new BadRequestError(
        "Validation failed. Details: email: email must be an email"
      )
    );
  });
  it("It should not be possible to create a user with an invalid password", async () => {
    const userData: User = {
      name: "teste5",
      email: "teste5@teste.com",
      password: "1234567",
    };
    await expect(createUserService.create(userData)).rejects.toThrow(
      new BadRequestError(
        "Validation failed. Details: password: password must be longer than or equal to 8 characters"
      )
    );
  });
});
