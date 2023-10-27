import { Request, Response } from "express";
import { TaskService } from "./TaskService";

class TaskController {
  constructor(private Task: TaskService) {}
  async create(request: Request, response: Response) {
    const { title, description, isFinished, userId } = request.body;
    const task = await this.Task.create({
      title,
      description,
      isFinished,
      userId,
    });
    return response.status(201).json(task);
  }
  async update(request: Request, response: Response) {
    const { id, title, description, isFinished, userId } = request.body;
    const task = await this.Task.update({
      id,
      title,
      description,
      isFinished,
      userId,
    });
    return response.status(200).json(task);
  }
  async delete(request: Request, response: Response) {
    const { id, userId } = request.body;
    await this.Task.delete({
      id,
      userId,
    });
    return response.status(204).json();
  }
  async getAllTasks(request: Request, response: Response) {
    const { userId } = request.params;

    const task = await this.Task.getAllTasks({
      userId,
    });

    return response.status(200).json(task);
  }
}

export { TaskController };
