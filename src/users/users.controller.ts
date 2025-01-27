import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddInstructorDto } from './dto/add-instructor-dto';
import { AddSchoolDto } from './dto/add-school-dto';
import { AddStudentDto } from './dto/add-student-dto';
import { ChangePasswordDto } from './dto/change-password-dto';
import { RegisterDto } from './dto/register-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserType } from './enums/user-types.enum';
import { AllowToAddAdminGuard } from './guards/allowed-add-admin';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsSchoolGuard } from './guards/is-school.guard';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AllowToAddAdminGuard)
  @Post('add-admin')
  @ApiResponse({
    description: 'Add an admin',
    type: User,
  })
  async registerAdmin(@Body() body: RegisterDto) {
    return this.usersService.create({ ...body, type: UserType.ADMIN});
  }

  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @Post('add-school')
  @ApiResponse({
    description: 'Add a school',
    type: User,
  })
  async registerSchool(@Body() body: AddSchoolDto) {
    return this.usersService.create({ ...body, type: UserType.SCHOOL});
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Post('add-instructor')
  @ApiResponse({
    description: 'Add an instructor',
    type: User,
  })
  async registerInstructor(@Body() body: AddInstructorDto, @Request() req) {
    return this.usersService.create({ ...body, type: UserType.INSTRUCTOR, creatorId: +req.user.id });
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Post('add-student')
  @ApiResponse({
    description: 'Add a student',
    type: User,
  })
  async registerStudent(@Body() body: AddStudentDto, @Request() req) {
    return this.usersService.create({ ...body, type: UserType.STUDENT, creatorId: +req.user.id });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiResponse({
    description: 'Logged user',
    type: User,
  })
  async getProfile(@Request() req) {
    return this.usersService.findOne(+req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('me/update')
  @ApiResponse({
    description: 'Update logged user',
    type: User,
  })
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+req.user.id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('me/change-password')
  @ApiResponse({
    description: 'Change logged user passsword',
    type: User,
  })
  changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    return this.usersService.changePassword(+req.user.id, changePasswordDto);
  }
  
}
