import { IsDateString, IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString } from "class-validator";
import { RelationDto } from "src/database/dto/relation.dto";
import { TestAppoimentStatus } from "../enums/test-appoiment-status.enum";
export class TestAppoimentDto {
  @IsNotEmpty()
  @IsEnum(TestAppoimentStatus)
  status: TestAppoimentStatus;

  @IsOptional()
  @IsString()
  note?: string;

  @IsNotEmpty()
  @IsNumber()
  points: number;

  @IsDateString()
  @IsNotEmpty()
  start: string;

  @IsDateString()
  @IsNotEmpty()
  finish: string;

  @IsNotEmptyObject()
  test: RelationDto;

  @IsNotEmptyObject()
  student: RelationDto;

  @IsNotEmptyObject()
  instructor: RelationDto;
}