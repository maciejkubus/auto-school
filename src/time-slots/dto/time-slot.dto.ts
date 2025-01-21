import { IsBoolean, IsDateString, IsNotEmpty, IsNotEmptyObject, IsOptional } from "class-validator";
import { RelationDto } from "src/database/dto/relation.dto";

export class TimeSlotDto {
  @IsDateString()
  @IsNotEmpty()
  start: string;

  @IsDateString()
  @IsNotEmpty()
  finish: string;

  @IsBoolean()
  @IsOptional()
  canceled?: boolean;

  @IsNotEmptyObject()
  instructor: RelationDto;
}