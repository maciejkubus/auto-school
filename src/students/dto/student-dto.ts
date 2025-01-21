import { IsNotEmpty, IsString } from "class-validator";

export class StudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;
}