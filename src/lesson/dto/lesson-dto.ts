import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmptyObject, IsOptional, IsString } from "class-validator";
import { RelationDto } from "src/database/dto/relation.dto";
import { LessonStatus } from "../enums/lesson-status.enum";

export class LessonDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Check homework.',
    description: 'Quick note about lesson',
    required: false,
  })
  note?: string;

  @IsEnum(LessonStatus)
  @IsOptional()
  @ApiProperty({
    example: 'booked',
    description: 'Lesson Status (booked, done, canceled)',
    required: false,
    enum: LessonStatus,
  })
  status?: LessonStatus;

  @IsNotEmptyObject()
  @ApiProperty({
    example: RelationDto,
    type: () => RelationDto
  })
  timeSlot: RelationDto;

  @IsNotEmptyObject()
  @ApiProperty({
    example: RelationDto,
    type: () => RelationDto
  })
  lessonType: RelationDto;

  @IsNotEmptyObject()
  @ApiProperty({
    example: RelationDto,
    type: () => RelationDto
  })
  student: RelationDto;

  @IsNotEmptyObject()
  @ApiProperty({
    example: RelationDto,
    type: () => RelationDto
  })
  instructor: RelationDto;
}