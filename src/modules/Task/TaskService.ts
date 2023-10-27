import { Task } from "../../entities/Task";
import { NotFoundError } from "../../helpers/api-errors";
import { ITaskRepository } from "../../repositories/ITaskRepositories";

interface ITaskRequest {
  id?: string;
  title: string;
  description: string;
  isFinished: boolean;
  userId: string;
}

class TaskService {
  constructor(private taskRepository: ITaskRepository) {}

  async create({ title, description, isFinished, userId }: ITaskRequest) {
    const taskCreate = Task.create({
      title,
      description,
      isFinished,
      userId,
    });
    const task = await this.taskRepository.create(taskCreate);

    return task;
  }

  async update({ id, title, description, isFinished, userId }: ITaskRequest) {
    const taskAlreadyExists = await this.taskRepository.exists(id, userId);
    
    if (!taskAlreadyExists) {
      throw new NotFoundError("Task not found.");
    }

    const taskCreate = Task.create({
      id,
      userId,
      title,
      description,
      isFinished,
    });

    const task = await this.taskRepository.update(taskCreate);

    return task;
  }

  async delete({ id, userId }: Partial<ITaskRequest>) {
    const taskAlreadyExists = await this.taskRepository.exists(id, userId);

    if (!taskAlreadyExists) {
      throw new NotFoundError("Task not found.");
    }

    const task = await this.taskRepository.delete(id, userId);

    return task;
  }

  async getAllTasks({ userId }: Partial<ITaskRequest>) {
    if (!userId) {
      throw new NotFoundError("Invalid user.");
    }
    const tasks = await this.taskRepository.allTasks(userId);
    if (!tasks || tasks.length === 0) {
      throw new NotFoundError("No tasks found.");
    }
    return tasks;
  }
}
export { TaskService };
