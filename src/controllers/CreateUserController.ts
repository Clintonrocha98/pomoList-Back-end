import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { hash } from "bcryptjs";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;

      const userExist = await prisma.user.findUnique({
        where: { email },
      });

      if (userExist) {
        return response.json({
          error: true,
          message: "Erro: Usuário Invalido!",
        });
      }
      const passwordHash = await hash(password, 8);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash,
        },
      });

      return response.json({
        error: false,
        message: "Sucesso: usuario cadastrado com sucesso!",
        user,
      });
    } catch (error) {
      return response.json({ message: error.message });
    }
  }
}
