import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { UserType } from 'src/users/enums/user-types.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(8, 64)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEnum(UserType)
  type: UserType;
}
