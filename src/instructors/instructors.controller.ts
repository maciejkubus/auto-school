import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InstructorDto } from './dto/instructor-dto';
import { InstructorUpdateDto } from './dto/instructor-update-dto';
import { Instructor } from './entity/instructor.entity';
import { InstructorsService } from './instructors.service';

@Controller('instructors')
@ApiTags('Instructors')
export class InstructorsController {
  constructor(private readonly instructorsService: InstructorsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiResponse({
    description: 'Logged instructor',
    type: () => Instructor,
  })
  async get(@Request() req) {
    return this.instructorsService.findByUser(+req.user.id, true);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  @ApiResponse({
    description: 'Update current instructor',
    type: () => Instructor,
    example: () => Instructor,
  })
  @ApiBody({
    type: () => InstructorDto,
  })
  update(@Request() req, @Body() updateInstructorDto: InstructorUpdateDto) {
    return this.instructorsService.updateByUser(+req.user.id, updateInstructorDto);
  }
}
