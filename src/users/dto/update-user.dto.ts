import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'maciekkubus@gmail.com',
    description: 'E-mail adress',
  })
  email: string;
}
