import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'maciekkubus@gmail.com',
    description: 'E-mal adress',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'PaSsWoRd420',
    description: 'Password',
  })
  password: string;
}
