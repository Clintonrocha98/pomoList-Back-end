import { Request, Response } from "express";
import { TaskController } from "./TaskController";
import { TaskService } from "./TaskService";
import { TasksRepositoryInMemory } from "../../repositories/inMemory/TasksRepositoryInMemory";

jest.mock("./TaskService");

describe("TaskController", () => {
  let taskRepositoryInMemory: TasksRepositoryInMemory;
  let taskController: TaskController;
  let mockTaskService: jest.Mocked<TaskService>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    taskRepositoryInMemory = new TasksRepositoryInMemory();
    mockTaskService = new TaskService(
      taskRepositoryInMemory
    ) as jest.Mocked<TaskService>;
    taskController = new TaskController(mockTaskService);

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should create a new task successfully", async () => {
    const mockRequest: Request = {
      body: {
        title: "Task 1",
        description: "Description 1",
        isFinished: false,
        userId: "1",
      },
    } as Request;

    mockTaskService.create.mockResolvedValueOnce({
      id: "1",
      ...mockRequest.body,
    });

    await taskController.create(mockRequest, mockResponse as Response);

    expect(mockTaskService.create).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      id: "1",
      ...mockRequest.body,
    });
  });

  it("should update a task successfully", async () => {
    const mockRequest: Request = {
      body: {
        id: "1",
        title: "Updated Task",
        description: "Updated Description",
        isFinished: true,
        userId: "1",
      },
    } as Request;

    mockTaskService.update.mockResolvedValueOnce({
      id: "1",
      ...mockRequest.body,
    });

    await taskController.update(mockRequest, mockResponse as Response);

    expect(mockTaskService.update).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      id: "1",
      ...mockRequest.body,
    });
  });

  it("should delete a task successfully", async () => {
    const mockRequest: Request = { body: { id: 1, userId: "1" } } as Request;

    await taskController.delete(mockRequest, mockResponse as Response);

    expect(mockTaskService.delete).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(204);
    expect(mockResponse.json).toHaveBeenCalledWith();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
