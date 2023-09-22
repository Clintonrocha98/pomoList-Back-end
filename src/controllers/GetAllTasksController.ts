import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class GetAllTasksController {
  async handle(request: Request, response: Response) {
    try {
      const { userId } = request.body;
      const tasks = await prisma.task.findMany({ where: { userId } });

      if (!tasks || tasks.length === 0) {
        return response.json({
          error: true,
          message: "Error: nenhuma Task encontrada!",
        });
      }
      return response.json({
        error: false,
        tasks,
      });
    } catch (error) {
      return response.json({ message: error.message });
    }
  }
}
