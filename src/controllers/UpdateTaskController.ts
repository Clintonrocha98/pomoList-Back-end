import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export class UpdateTaskControler {
  async handle(request: Request, response: Response) {
    try {
      const { id, title, description, userId, isFinished } = request.body;
      const taskExists = await prisma.task.findUnique({
        where: { id, userId },
      });

      if (!taskExists) {
        return response.json({
          erro: true,
          message: "Error: Task não encontrada!",
        });
      }

      const updateData: {
        title?: string;
        description?: string;
        isFinished?: boolean;
      } = {};

      if (title !== undefined) {
        updateData.title = title;
      }

      if (description !== undefined) {
        updateData.description = description;
      }
      if (isFinished !== undefined) {
        updateData.isFinished = isFinished;
      }

      const updatedTask = await prisma.task.update({
        where: {
          userId: userId,
          id: id,
        },
        data: updateData,
      });

      return response.json({
        error: false,
        message: "sucesso: Task atualizado com sucesso",
        updatedTask,
      });
    } catch (error) {
      return response.json({ message: error.message });
    }
  }
}
