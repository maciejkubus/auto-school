import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentDto } from './dto/student-dto';
import { StudentUpdateDto } from './dto/student-update-dto';
import { Student } from './entities/student.entity';
import { StudentsService } from './students.service';

@Controller('students')
@ApiTags('Students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiResponse({
    description: 'Logged student',
    type: () => Student,
  })
  async get(@Request() req) {
    return this.studentsService.findByUser(+req.user.id, true);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  @ApiResponse({
    description: 'Update current instructor',
    type: Student,
    example: () => Student,
  })
  @ApiBody({
    type: () => StudentDto,
  })
  update( @Body() updateStudentDto: StudentUpdateDto, @Request() req) {
    return this.studentsService.updateByUser(+req.user.id, updateStudentDto);
  }
}
