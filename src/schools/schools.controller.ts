import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SchoolUpdateDto } from './dto/school-update.dto';
import { SchoolsService } from './schools.service';

@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async get(@Request() req) {
    return this.schoolsService.findByUser(+req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me/instructors')
  async getInstructors(@Request() req) {
    const school = await this.schoolsService.findByUser(+req.user.id, ['instructors']);
    return school.instructors;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me/students')
  async getStudents(@Request() req) {
    const school = await this.schoolsService.findByUser(+req.user.id, ['students']);
    return school.students;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  update(@Request() req, @Body() updateSchoolDto: SchoolUpdateDto) {
    return this.schoolsService.updateByUser(+req.user.id, updateSchoolDto);
  }
}
