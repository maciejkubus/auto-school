import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RelationDto } from 'src/database/dto/relation.dto';
import { Instructor } from 'src/instructors/entity/instructor.entity';
import { Student } from 'src/students/entities/student.entity';
import { SchoolDto } from './dto/school-dto';
import { SchoolUpdateDto } from './dto/school-update.dto';
import { School } from './entities/school.entity';
import { SchoolsService } from './schools.service';

@Controller('schools')
@ApiTags('Schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiResponse({
    description: 'Logged school',
    type: () => School,
  })
  async get(@Request() req) {
    return this.schoolsService.findByUser(+req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me/instructors')
  @ApiResponse({
    description: 'instructors in school',
    isArray: true,
    type: () => Instructor,
    example: () => [RelationDto]
  })
  async getInstructors(@Request() req) {
    const school = await this.schoolsService.findByUser(+req.user.id, ['instructors']);
    return school.instructors;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me/students')
  @ApiResponse({
    description: 'students in school',
    isArray: true,
    type: () => Student,
    example: () => [RelationDto]
  })
  async getStudents(@Request() req) {
    const school = await this.schoolsService.findByUser(+req.user.id, ['students']);
    return school.students;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  @ApiResponse({
    description: 'Update current school',
    type: () => School,
  })
  @ApiBody({
    type: () => SchoolDto,
  })
  update(@Request() req, @Body() updateSchoolDto: SchoolUpdateDto) {
    return this.schoolsService.updateByUser(+req.user.id, updateSchoolDto);
  }
}
