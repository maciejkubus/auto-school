import { IsNotEmpty, IsString } from "class-validator";

export class StudentDto {
  @IsString()
  @IsNotEmpty()
  name;

  @IsString()
  @IsNotEmpty()
  surname;
}