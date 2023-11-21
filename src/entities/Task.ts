import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

class Task {
  @IsString()
  @IsOptional()
    id?: string;

  @IsString()
    userId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
    title: string;

  @IsNotEmpty()
  @MaxLength(256)
    description: string;

  @IsBoolean()
    isFinished: boolean;

  private constructor({ id, title, description, isFinished, userId }: Task) {
    return Object.assign(this, {
      id,
      title,
      description,
      isFinished,
      userId,
    });
  }

  static create({ id, title, description, isFinished, userId }: Task) {
    const task = new Task({ id, title, description, isFinished, userId });
    return task;
  }
}

export { Task };
