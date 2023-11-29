import { PrismaUserRepository } from "../../repositories/prisma/PrismaUserRepository";
import { UserController } from "./UserController";
import { UserService } from "./UserService";

export const createUserFactory = () => {
  const usersRepository = new PrismaUserRepository();
  const createUser = new UserService(usersRepository);
  const createUserController = new UserController(createUser);
  return createUserController;
};
