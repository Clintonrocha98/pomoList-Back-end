import { UsersRepositoryInMemory } from "../../repositories/inMemory/UsersRepositoryInMemory";
import { PrismaUserRepository } from "../../repositories/prisma/PrismaUserRepository";
import { UserController } from "./UserController";
import { UserService } from "./UserService";

export const createUserFactory = () => {
  const repoInMemory = new UsersRepositoryInMemory();
  // const usersRepository = new PrismaUserRepository();
  const createUser = new UserService(repoInMemory);
  const createUserController = new UserController(createUser);
  return createUserController;
};
