import { prisma } from "../../database/prisma";
import { Task } from "../../entities/Task";
import { ITaskRepository } from "../ITaskRepositories";

class PrismaTaskRepository implements ITaskRepository {
  async create({
    title,
    description,
    isFinished,
    userId,
  }: Task): Promise<Task> {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        isFinished,
        userId,
      },
    });
    return task;
  }
  async update({
    id,
    title,
    description,
    isFinished,
    userId,
  }: Task): Promise<Task> {
    const task = await prisma.task.update({
      where: { userId: userId, id: id },
      data: { title, description, isFinished },
    });

    return task;
  }
  async exists(id: string, userId: string): Promise<boolean> {
    const task = await prisma.task.findUnique({
      where: {
        id,
        userId,
      },
    });
    return !!task;
  }
  async delete(id: string, userId: string): Promise<void> {
    await prisma.task.delete({
      where: {
        id,
        userId,
      },
    });
  }
  async allTasks(userId: string): Promise<Task[]> {
    const allTasks = await prisma.task.findMany({ where: { userId } });
    return allTasks;
  }
}

export { PrismaTaskRepository };
