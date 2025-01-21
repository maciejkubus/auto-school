import { IsArray, IsDateString, IsNotEmpty, IsNotEmptyObject } from "class-validator";
import { RelationDto } from "src/database/dto/relation.dto";

class TimeSlotSingleDto {
  @IsDateString()
  @IsNotEmpty()
  start: string;

  @IsDateString()
  @IsNotEmpty()
  finish: string;
}

export class TimeSlotMultipleDto {
  
  @IsArray()
  items: TimeSlotSingleDto[];

  @IsNotEmptyObject()
  instructor: RelationDto;
}