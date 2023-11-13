import { User } from "../../entities/User";
import { prisma } from "../../database/prisma";
import { IUsersRepository } from "../IUsersRepositories";
import { userDto } from "../../dto/userDto";

type emailType = userDto["email"];

class PrismaUserRepository implements IUsersRepository {
  async exists(email: emailType): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return !!user;
  }
  async create({ name, email, password }: userDto): Promise<User> {
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
