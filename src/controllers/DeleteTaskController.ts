import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class DeleteTaskController {
  async handle(request: Request, response: Response) {
    try {
      const { id, userId } = request.body;
      const taskExists = await prisma.task.findUnique({
        where: { id, userId },
      });
      if (!taskExists) {
        return response.json({
          error: true,
          message: "Error: Task não encontrada!",
        });
      }

      const deleteTask = await prisma.task.delete({
        where: {
          id: id,
          userId: userId,
        },
      });

      return response.json({
        error: false,
        message: "sucesso: Task deletado com sucesso",
        deleteTask,
      });
    } catch (error) {
      return response.json({ message: error.message });
    }
  }
}
