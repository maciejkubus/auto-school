import { IsDateString, IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString } from "class-validator";
import { TestAppoimentStatus } from "../enums/test-appoiment-status.enum";

class TestAppoimentRelationDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

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
  test: TestAppoimentRelationDto;

  @IsNotEmptyObject()
  student: TestAppoimentRelationDto;

  @IsNotEmptyObject()
  instructor: TestAppoimentRelationDto;
}