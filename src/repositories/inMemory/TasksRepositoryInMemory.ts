import { Task } from "../../entities/Task";
import { ITaskRepository } from "../ITaskRepositories";
import { v4 as uuid } from "uuid";

class TasksRepositoryInMemory implements ITaskRepository {
  public tasks: Task[] = [];

  async create(task: Task): Promise<Task> {
    Object.assign(task, {
      id: uuid(),
    });
    this.tasks.push(task);
    return task;
  }

  async update(task: Task): Promise<Task> {
    const index = this.tasks.findIndex(
      (t) => t.id === task.id && t.userId === task.userId
    );
    this.tasks[index] = task;
    return task;
  }

  async exists(id: string, userId: string): Promise<boolean> {
    return this.tasks.some((task) => task.id === id && task.userId === userId);

  }

  async delete(id: string, userId: string): Promise<void> {
    const index = this.tasks.findIndex(
      (task) => task.id === id && task.userId === userId
    );
    this.tasks.splice(index, 1);
  }

  async allTasks(userId: string): Promise<Task[]> {
    return this.tasks.filter((task) => task.userId === userId);
  }
}

export { TasksRepositoryInMemory };
