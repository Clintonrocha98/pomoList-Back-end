import { Task } from "../entities/Task";

interface ITaskRepository {
  create(task: Task): Promise<Task>;
  update(task: Task): Promise<Task>;
  exists(id: string, userId: string): Promise<boolean>;
  delete(userId: string, id: string): Promise<void>;
  allTasks(userId: string): Promise<Task[]>;
}

export { ITaskRepository };
