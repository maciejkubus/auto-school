import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class StudentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'John',
    description: 'First Name',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Last name',
    description: 'Krasinski',
  })
  surname: string;
}