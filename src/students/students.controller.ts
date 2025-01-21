import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StudentUpdateDto } from './dto/student-update-dto';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async get(@Request() req) {
    return this.studentsService.findByUser(+req.user.id, true);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  update(@Request() req, @Body() updateStudentDto: StudentUpdateDto) {
    return this.studentsService.updateByUser(+req.user.id, updateStudentDto);
  }
}
