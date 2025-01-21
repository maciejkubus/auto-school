import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InstructorUpdateDto } from './dto/instructor-update-dto';
import { InstructorsService } from './instructors.service';

@Controller('instructors')
export class InstructorsController {
  constructor(private readonly instructorsService: InstructorsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async get(@Request() req) {
    return this.instructorsService.findByUser(+req.user.id, true);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  update(@Request() req, @Body() updateInstructorDto: InstructorUpdateDto) {
    return this.instructorsService.updateByUser(+req.user.id, updateInstructorDto);
  }
}
