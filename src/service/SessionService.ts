import { compare } from "bcryptjs";
import { prisma } from "../lib/prisma";
import { sign } from "jsonwebtoken";

type UserRequest = {
  email: string;
  password: string;
};

export class SessionService {
  async handle({ email, password }: UserRequest) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return new Error("user does not exists");
    }
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return new Error("User or password incorrect");
    }
    const token = sign(
      { id: user.id, name: user.name },
      process.env.SECRET_JWT,
      {
        subject: user.id,
      }
    );
    return { token };
  }
}
