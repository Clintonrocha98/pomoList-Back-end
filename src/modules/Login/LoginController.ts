import { Request, Response } from "express";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { prisma } from "../../database/prisma";
import { NotFoundError, UnauthorizedError } from "../../helpers/api-errors";

export class LoginController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundError("Invalid user.");
    }
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedError("Invalid email or password.");
    }

    const token = sign({}, process.env.SECRET_JWT, {
      subject: user.id,
    });

    return response.status(200).json({ token, id: user.id });
  }
}
