import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString } from "class-validator";
import { RelationDto } from "src/database/dto/relation.dto";
import { TestAppoimentStatus } from "../enums/test-appoiment-status.enum";
export class TestAppoimentDto {
  @IsNotEmpty()
  @IsEnum(TestAppoimentStatus)
  @ApiProperty({
    example: 'ENROLLED',
    description: 'Test status (enrolled, passed, failed, canceled)',
    enum: TestAppoimentStatus,
  })
  status: TestAppoimentStatus;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'super secret note...',
    description: 'Quick note about test',
    required: false,
  })
  note?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 100,
    description: 'Points earned on test',
    required: false,
  })
  points?: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ 
    example: '2000-03-25T03:15:00.000Z', 
    description: 'Test start time' 
  })
  start: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ 
    example: '2000-03-25T03:15:00.000Z', 
    description: 'Test finisg time' 
  })
  finish: string;

  @IsNotEmptyObject()
  @ApiProperty({
    example: RelationDto,
    type: () => RelationDto
  })
  test: RelationDto;

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