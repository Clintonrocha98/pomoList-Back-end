import { IsEmail, IsString, MinLength } from "class-validator";

export class Login {
  @IsString()
  @IsEmail()
    email: string;
  
  @IsString()
  @MinLength(8)
    password: string;

  constructor(email: string, password: string) {
    return Object.assign(this, {
      email,
      password,
    });
  }
  static create(email: string, password: string) {
    const loginRequest = new Login(email, password);
    return loginRequest;
  }
}
