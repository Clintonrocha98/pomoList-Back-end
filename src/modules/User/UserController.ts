import { Request, Response } from "express";
import { UserService } from "./UserService";

class UserController {
  constructor(private createUser: UserService) {}

  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;
    await this.createUser.create({ email, password, name });

    return response.status(204).json("user created successfully!");
  }
}

export { UserController };
