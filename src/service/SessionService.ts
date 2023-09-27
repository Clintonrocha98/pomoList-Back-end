import { compare } from "bcryptjs";
import { prisma } from "../lib/prisma";
import { sign } from "jsonwebtoken";

type UserRequest = {
  email: string;
  password: string;
};
type ReturnRequest = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export class SessionService {
  async handle({
    email,
    password,
  }: UserRequest): Promise<Error | ReturnRequest> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Error("user does not exists");
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return new Error("User or password incorrect");
    }
    const token = sign({}, process.env.SECRET_JWT, { subject: user.id });
    return { token, user };
  }
}
