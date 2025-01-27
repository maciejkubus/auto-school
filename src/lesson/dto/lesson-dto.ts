import { IsEnum, IsNotEmptyObject, IsOptional, IsString } from "class-validator";
import { RelationDto } from "src/database/dto/relation.dto";
import { LessonStatus } from "../enums/lesson-status.enum";

export class LessonDto {
  @IsOptional()
  @IsString()
  note?: string;

  @IsEnum(LessonStatus)
  @IsOptional()
  status?: LessonStatus;

  @IsNotEmptyObject()
  timeSlot: RelationDto;

  @IsNotEmptyObject()
  lessonType: RelationDto;

  @IsNotEmptyObject()
  student: RelationDto;

  @IsNotEmptyObject()
  instructor: RelationDto;
}