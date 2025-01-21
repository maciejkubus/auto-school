import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddSchoolDto } from './dto/add-school-dto';
import { ChangePasswordDto } from './dto/change-password-dto';
import { RegisterDto } from './dto/register-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserType } from './enums/user-types.enum';
import { AllowToAddAdminGuard } from './guards/allowed-add-admin';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsSchoolGuard } from './guards/is-school.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AllowToAddAdminGuard)
  @Post('add-admin')
  async registerAdmin(@Body() body: RegisterDto) {
    return this.usersService.create({ ...body, type: UserType.ADMIN});
  }

  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @Post('add-school')
  async registerSchool(@Body() body: AddSchoolDto) {
    return this.usersService.create({ ...body, type: UserType.SCHOOL});
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Post('add-instructor')
  async registerInstructor(@Body() body: RegisterDto) {
    return this.usersService.create({ ...body, type: UserType.INSTRUCTOR});
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Post('add-student')
  async registerStudent(@Body() body: RegisterDto) {
    return this.usersService.create({ ...body, type: UserType.STUDENT});
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Request() req) {
    return this.usersService.findOne(+req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('me/update')
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+req.user.id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('me/change-password')
  changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    return this.usersService.changePassword(+req.user.id, changePasswordDto);
  }
  
}
