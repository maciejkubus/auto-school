import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject } from 'class-validator';
import { InstructorDto } from 'src/instructors/dto/instructor-dto';
import { RegisterDto } from './register-dto';

export class AddInstructorDto extends RegisterDto {
  @IsNotEmptyObject()
  @ApiProperty({
    example: { id: 1 },
    description: 'student relation',
    type: () => InstructorDto,
  })
  instructor: InstructorDto;
}
