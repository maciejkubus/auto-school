import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsNotEmpty, IsNotEmptyObject } from "class-validator";
import { RelationDto } from "src/database/dto/relation.dto";

class TimeSlotSingleDto {
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
}

export class TimeSlotMultipleDto {
  
  @IsArray()
  @ApiProperty({
    description: "Time slots",
    type: () => TimeSlotSingleDto,
    isArray: true,
  })
  items: TimeSlotSingleDto[];

  @IsNotEmptyObject()
  @ApiProperty({
    example: RelationDto,
    type: () => RelationDto
  })
  instructor: RelationDto;
}