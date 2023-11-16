import { IsEmail, IsString, MaxLength, Min } from "class-validator";

export class userDto {
  @IsEmail()
    email: string;

  @IsString()
  @MaxLength(100)
    name: string;
  
  @Min(8)
  @IsString()
    password: string;
}
