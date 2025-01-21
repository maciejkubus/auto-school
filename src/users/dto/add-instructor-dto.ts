import { IsNotEmptyObject } from 'class-validator';
import { InstructorDto } from 'src/instructors/dto/instructor-dto';
import { RegisterDto } from './register-dto';

export class AddInstructorDto extends RegisterDto {
  @IsNotEmptyObject()
  instructor: InstructorDto;
}
