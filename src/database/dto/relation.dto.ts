import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class RelationDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;
}