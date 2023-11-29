import { Request, Response } from "express";
import { LoginService } from "./LoginService";

export class LoginController {
  constructor(private login: LoginService) {}

  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    const data = this.login.create(email, password);
    return response.status(200).json(data);
  }
}
