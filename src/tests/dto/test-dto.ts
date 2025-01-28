import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class TestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Unit I',
    description: 'Name of the test.',
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({
    example: 50,
    description: 'Max amount of point to earn on the test',
  })
  maxPoints: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 20,
    description: 'Amount of point required to pass the test',
  })
  pointsToPass: number;
}