import { Request, Response } from "express";
import { CreateTaskService } from "../service/CreateTaskService";

export class CreateTaskControoler {
  async handle(request: Request, response: Response) {
    try {
      const { title, description, isFinished, userId } = request.body;

      const createTask = new CreateTaskService();
      const newTask = await createTask.execute(
        title,
        description,
        isFinished,
        userId
      );

      return response.json({
        error: false,
        message: "sucesso: post cadastro com sucesso!",
        newTask,
      });
    } catch (error) {
      console.log(error.message);
      return response.json({ message: error.message });
    }
  }
}
