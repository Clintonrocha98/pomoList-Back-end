import { User } from "../../entities/User";
import { prisma } from "../../database/prisma";
import { IUsersRepository } from "../IUsersRepositories";

class PrismaUserRepository implements IUsersRepository {
  async exists(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return !!user;
  }
  async create({ name, email, password }: User): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return user;
  }
}

export { PrismaUserRepository };
