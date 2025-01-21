import { IsNotEmpty, IsString } from "class-validator";

export class InstructorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}