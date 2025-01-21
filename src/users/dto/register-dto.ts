import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { UserType } from '../enums/user-types.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(8, 64)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  type?: UserType;
}
