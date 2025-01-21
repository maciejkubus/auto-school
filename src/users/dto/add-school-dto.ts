import { IsNotEmptyObject } from 'class-validator';
import { SchoolDto } from 'src/schools/dto/school-dto';
import { RegisterDto } from './register-dto';

export class AddSchoolDto extends RegisterDto {
  @IsNotEmptyObject()
  school: SchoolDto;
}
