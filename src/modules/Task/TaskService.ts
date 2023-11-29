import { validate } from "class-validator";
import { Task } from "../../entities/Task";
import { BadRequestError, NotFoundError } from "../../helpers/api-errors";
import { ITaskRepository } from "../../repositories/ITaskRepositories";
import formatValidationErrors from "../../utils/formatValidationErrors";

class TaskService {
  constructor(private taskRepository: ITaskRepository) {}

  async create(task: Task) {
    const taskCreate = Task.create(task);

    const validationErrors = await validate(taskCreate);

    if (validationErrors.length > 0) {
      throw new BadRequestError(formatValidationErrors(validationErrors));
    }

    const newTask = await this.taskRepository.create(taskCreate);

    return newTask;
  }

  async update({ id, title, description, isFinished, userId }: Partial<Task>) {
    const taskAlreadyExists = await this.taskRepository.exists(id, userId);

    if (!taskAlreadyExists) {
      throw new NotFoundError("Task not found.");
    }

    const task = await this.taskRepository.update({
      title,
      description,
      isFinished,
      userId,
    });

    return task;
  }

  async delete({ id, userId }: Partial<Task>) {
    const taskAlreadyExists = await this.taskRepository.exists(id, userId);

    if (!taskAlreadyExists) {
      throw new NotFoundError("Task not found.");
    }

    const task = await this.taskRepository.delete(id, userId);

    return task;
  }

  async getAllTasks({ userId }: Partial<Task>) {
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
