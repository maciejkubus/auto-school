import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject } from 'class-validator';
import { SchoolDto } from 'src/schools/dto/school-dto';
import { RegisterDto } from './register-dto';

export class AddSchoolDto extends RegisterDto {
  @IsNotEmptyObject()
  @ApiProperty({
    example: { id: 1 },
    description: 'student relation',
    type: () => SchoolDto,
  })
  school: SchoolDto;
}
