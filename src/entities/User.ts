import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class User {
  @MaxLength(100)
  @IsNotEmpty()
  @IsString()
    name: string;

  @IsString()
  @IsEmail()
    email: string;

  @MinLength(8)
    password: string;

  constructor({ name, email, password }: User) {
    return Object.assign(this, {
      name,
      email,
      password,
    });
  }

  static create({ name, email, password }: User) {
    const user = new User({ name, email, password });
    return user;
  }
}
