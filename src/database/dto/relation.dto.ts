import { IsNotEmpty, IsNumber } from "class-validator";

export class RelationDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}