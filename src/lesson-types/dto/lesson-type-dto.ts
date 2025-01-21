import { IsNotEmpty, IsNotEmptyObject, IsOptional, IsString } from "class-validator";
import { RelationDto } from "src/database/dto/relation.dto";

export class LessonTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNotEmptyObject()
  school?: RelationDto;
}