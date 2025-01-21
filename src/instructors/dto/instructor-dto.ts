import { IsNotEmpty, IsString } from "class-validator";

export class InstructorDto {
  @IsString()
  @IsNotEmpty()
  name;

  @IsString()
  @IsNotEmpty()
  surname;

  @IsString()
  @IsNotEmpty()
  title;
}