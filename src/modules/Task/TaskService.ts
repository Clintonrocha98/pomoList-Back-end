import { taskDto } from "../../dto/taskDto";
import { Task } from "../../entities/Task";
import { NotFoundError } from "../../helpers/api-errors";
import { ITaskRepository } from "../../repositories/ITaskRepositories";

class TaskService {
  constructor(private taskRepository: ITaskRepository) {}

  async create({ title, description, isFinished, userId }: taskDto) {
    const taskCreate = Task.create({
      title,
      description,
      isFinished,
      userId,
    });
    const task = await this.taskRepository.create(taskCreate);

    return task;
  }

  async update({
    id,
    title,
    description,
    isFinished,
    userId,
  }: Partial<taskDto>) {
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

  async delete({ id, userId }: Partial<taskDto>) {
    const taskAlreadyExists = await this.taskRepository.exists(id, userId);

    if (!taskAlreadyExists) {
      throw new NotFoundError("Task not found.");
    }

    const task = await this.taskRepository.delete(id, userId);

    return task;
  }

  async getAllTasks({ userId }: Partial<taskDto>) {
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
