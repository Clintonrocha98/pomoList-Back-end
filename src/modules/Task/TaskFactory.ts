import { PrismaTaskRepository } from "../../repositories/prisma/PrismaTaskRepository";
import { TaskController } from "./TaskController";
import { TaskService } from "./TaskService";

export const TaskFactory = () => {
  const taskRepository = new PrismaTaskRepository();
  const taskService = new TaskService(taskRepository);
  const taskController = new TaskController(taskService);
  return taskController;
};
