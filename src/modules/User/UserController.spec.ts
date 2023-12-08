import { Request, Response } from "express";
import { UserController } from "./UserController";
import { UserService } from "./UserService";

jest.mock("./UserService");

describe("UserController", () => {
  let userController: UserController;
  let mockCreateUser: jest.Mock;

  beforeEach(() => {
    mockCreateUser = jest.fn();
    userController = new UserController({
      create: mockCreateUser,
    } as unknown as UserService);
  });

  it("should create a new user successfully", async () => {
    const requestMock: Request = {
      body: {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      },
    } as Request;

    const responseMock: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    mockCreateUser.mockResolvedValueOnce(undefined);

    await userController.handle(requestMock, responseMock);

    expect(mockCreateUser).toHaveBeenCalledWith({
      email: "john@example.com",
      password: "password123",
      name: "John Doe",
    });
    expect(responseMock.status).toHaveBeenCalledWith(204);
    expect(responseMock.json).toHaveBeenCalledWith(
      "user created successfully!"
    );
  });
});
