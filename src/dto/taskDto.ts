import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class taskDto {
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
}
