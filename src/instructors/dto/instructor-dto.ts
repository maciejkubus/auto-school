import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class InstructorDto {
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Title',
    description: 'Senior instructor',
  })
  title: string;
}