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
  @Patch('update')
  update(@Request() req, @Body() updateSchoolDto: SchoolUpdateDto) {
    return this.schoolsService.updateByUser(+req.user.id, updateSchoolDto);
  }
}
