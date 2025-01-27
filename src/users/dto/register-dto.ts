import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { UserType } from '../enums/user-types.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(8, 64)
  @ApiProperty({
    example: 'PaSsWoRd420',
    description: 'password',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'maciekkubus@gmail.com',
    description: 'E-mail adress',
  })
  email: string;

  @ApiProperty({
    example: 'school',
    description: 'User type (school, instructor, student)',
    enum: UserType,
    required: false
  })
  type?: UserType;
}
