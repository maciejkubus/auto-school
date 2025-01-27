import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @ApiProperty({
    example: 'PaSsWoRd420',
    description: 'current password',
  })
  currentPassword: string;

  @IsString()
  @ApiProperty({
    example: 'PaSsWoRd420',
    description: 'new password',
  })
  newPassword: string;
}
