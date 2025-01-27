import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject } from 'class-validator';
import { StudentDto } from 'src/students/dto/student-dto';
import { RegisterDto } from './register-dto';

export class AddStudentDto extends RegisterDto {
  @IsNotEmptyObject()
  @ApiProperty({
    example: { id: 1 },
    description: 'student relation',
    type: () => StudentDto,
  })
  student: StudentDto;
}
