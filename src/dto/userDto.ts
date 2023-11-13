import { IsEmail, IsString, MaxLength } from "class-validator";

export class userDto {
  @IsEmail()
    email: string;

  @IsString()
  @MaxLength(100)
    name: string;

  @IsString()
    password: string;
}
