import { TaskService } from "./TaskService";
import { Task } from "../../entities/Task";
import { NotFoundError, BadRequestError } from "../../helpers/api-errors";
import { TasksRepositoryInMemory } from "../../repositories/inMemory/TasksRepositoryInMemory";

const taskInMemory = new TasksRepositoryInMemory();
const taskService = new TaskService(taskInMemory);

describe("Task Service", () => {
  describe("createTask", () => {
    it("should create a new task", async () => {
      const task: Task = {
        title: "Test Task",
        description: "This is a test task.",
        isFinished: false,
        userId: "111111",
      };
      const newTask = await taskService.create(task);

      expect(newTask).toHaveProperty("id");
    });

    it("should throw a BadRequestError if there are validation errors", async () => {
      const task: Task = {
        title: "",
        description: "",
        isFinished: false,
        userId: "1",
      };

      await expect(taskService.create(task)).rejects.toThrow(BadRequestError);
    });
  });

  describe("updateTask", () => {
    it("should update an existing task", async () => {
      const oldTask: Task = {
        title: "task1",
        description: "task befor update.",
        isFinished: false,
        userId: "2",
      };
      const oldTaskCreate = await taskService.create(oldTask);

      const newTask: Task = {
        title: "Updated Task",
        description: "This is an updated task.",
        isFinished: true,
        userId: oldTaskCreate.userId,
        id: oldTaskCreate.id,
      };

      expect(await taskService.update(newTask)).not.toBe(oldTask);
    });

    it("should throw a NotFoundError if the task does not exist", async () => {
      const task: Partial<Task> = {
        id: "1",
        title: "Updated Task",
        description: "This is an updated task.",
        isFinished: true,
        userId: "1",
      };

      await expect(taskService.update(task)).rejects.toThrow(NotFoundError);
    });
  });

  describe("deleteTask", () => {
    it("should delete an existing task", async () => {
      const deleteMock = jest
        .spyOn(taskService, "delete")
        .mockResolvedValueOnce();

      const task: Partial<Task> = {
        id: "1",
        userId: "1",
      };

      await taskService.delete(task);

      expect(deleteMock).toHaveBeenCalledWith(task);
      deleteMock.mockRestore();
    });

    it("should throw a NotFoundError if the task does not exist", async () => {
      const task: Partial<Task> = {
        id: "1",
        userId: "1",
      };

      await expect(taskService.delete(task)).rejects.toThrow(NotFoundError);
    });
  });

  describe("getAllTasks", () => {
    it("should get all tasks for a user", async () => {
      const tasks = [
        {
          title: "Task 1",
          description: "This is task 1.",
          isFinished: false,
          userId: "1",
        },
        {
          title: "Task 2",
          description: "This is task 2.",
          isFinished: true,
          userId: "1",
        },
      ];

      await taskService.create(tasks[0]);
      await taskService.create(tasks[1]);

      const returnedTasks = await taskService.getAllTasks({ userId: "1" });

      const tasksWithoutId = returnedTasks.map(({ id, ...rest }) => rest);

      expect(tasksWithoutId).toEqual(tasks);
    });

    it("should throw a NotFoundError if the user is not valid", async () => {

      await expect(taskService.getAllTasks({ userId: "5" })).rejects.toThrow(
        NotFoundError
      );
    });
  });
});
