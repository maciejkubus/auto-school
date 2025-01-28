import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNotEmptyObject, IsOptional, IsString } from "class-validator";
import { RelationDto } from "src/database/dto/relation.dto";

export class LessonTypeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Car lesson',
    description: 'lesson type name',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'lesson in car',
    description: 'lesson type description',
  })
  description: string;

  @IsOptional()
  @IsNotEmptyObject()
  @ApiProperty({
    example: RelationDto,
    type: () => RelationDto,
    nullable: true,
  })
  school?: RelationDto;
}