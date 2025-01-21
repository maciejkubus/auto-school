import { IsNotEmptyObject } from 'class-validator';
import { StudentDto } from 'src/students/dto/student-dto';
import { RegisterDto } from './register-dto';

export class AddStudentDto extends RegisterDto {
  @IsNotEmptyObject()
  student: StudentDto;
}
