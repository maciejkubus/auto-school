import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsNotEmptyObject, IsOptional } from "class-validator";
import { RelationDto } from "src/database/dto/relation.dto";
import { LessonDto } from "src/lesson/dto/lesson-dto";
import { Lesson } from "src/lesson/entity/lesson.entity";

export class TimeSlotDto {
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ 
    example: '2000-03-25T03:15:00.000Z', 
    description: 'Slot start' 
  })
  start: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ 
    example: '2000-03-25T03:15:00.000Z', 
    description: 'Slot end' 
  })
  finish: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ 
    example: false, 
    description: 'is time slot canceled' 
  })
  canceled?: boolean;

  @IsNotEmptyObject()
  @ApiProperty({
    example: RelationDto,
    type: () => RelationDto
  })
  instructor: RelationDto;

  @IsOptional()
  @ApiProperty({
    example: RelationDto,
    type: () => RelationDto
  })
  lesson?: LessonDto | Lesson;
}