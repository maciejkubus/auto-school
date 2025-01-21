import { OrGuard } from '@nest-lab/or-guard';
import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordDto } from './dto/change-password-dto';
import { RegisterDto } from './dto/register-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserType } from './enums/user-types.enum';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsSchoolGuard } from './guards/is-school.guard';
import { MyAccountGuard } from './guards/my-account.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @Post('add-school')
  async registerSchool(@Body() body: RegisterDto) {
    return this.usersService.create({ ...body, type: UserType.SCHOOL});
  }

  @UseGuards(AuthGuard('jwt'), OrGuard([IsSchoolGuard, IsAdminGuard]))
  @Post('add-instructor')
  async registerInstructor(@Body() body: RegisterDto) {
    return this.usersService.create({ ...body, type: UserType.INSTRUCTOR});
  }

  @UseGuards(AuthGuard('jwt'), OrGuard([IsSchoolGuard, IsAdminGuard]))
  @Post('add-student')
  async registerStudent(@Body() body: RegisterDto) {
    return this.usersService.create({ ...body, type: UserType.STUDENT});
  }

  @UseGuards(AuthGuard('jwt'), OrGuard([MyAccountGuard, IsAdminGuard]))
  @Get('me')
  async getProfile(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'), OrGuard([MyAccountGuard, IsAdminGuard]))
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'), MyAccountGuard)
  @Patch(':id/change-password')
  changePassword(@Param('id') id: number, @Body() changePasswordDto: ChangePasswordDto) {
    return this.usersService.changePassword(+id, changePasswordDto);
  }
  
}
