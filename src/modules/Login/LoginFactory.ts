import { PrismaUserRepository } from "../../repositories/prisma/PrismaUserRepository";
import { LoginController } from "./LoginController";
import { LoginService } from "./LoginService";

export const loginFactory = () => {
  const usersRepository = new PrismaUserRepository();
  const loginService = new LoginService(usersRepository);
  const login = new LoginController(loginService);
  return login;
};
