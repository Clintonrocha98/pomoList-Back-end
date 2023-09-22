import { prisma } from "../lib/prisma";

class CreateTaskService {
  public async execute(
    title: string,
    description: string,
    isFinished: boolean,
    userId: string
  ) {
    const task = await prisma.task.create({
      data: { title, description, isFinished, userId },
    });
    return task;
  }
}
export { CreateTaskService };
