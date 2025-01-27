import { IsBoolean, IsDateString, IsNotEmpty, IsNotEmptyObject, IsOptional } from "class-validator";
import { RelationDto } from "src/database/dto/relation.dto";
import { LessonDto } from "src/lesson/dto/lesson-dto";
import { Lesson } from "src/lesson/entity/lesson.entity";

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

  @IsOptional()
  lesson?: LessonDto | Lesson;
}