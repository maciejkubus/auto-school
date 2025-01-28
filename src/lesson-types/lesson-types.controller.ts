import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsSchoolGuard } from 'src/users/guards/is-school.guard';
import { LessonTypeDto } from './dto/lesson-type-dto';
import { LessonTypeUpdateDto } from './dto/lesson-type-update-dto';
import { LessonType } from './entity/lesson-type.entity';
import { LessonTypesService } from './lesson-types.service';

@Controller('lesson-types')
@ApiTags('Lesson types')
export class LessonTypesController {
  constructor(private readonly lessonTypesService: LessonTypesService) {}

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Post()
  @ApiResponse({
    description: 'Add a lesson type',
    type: () => LessonType,
  })
  async create(@Body() body: LessonTypeDto, @Request() req) {
    return await this.lessonTypesService.create(body, +req.user.id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiResponse({
    description: 'Get all lesson types at logged school',
    type: () => LessonType,
    isArray: true,
  })
  async find(@Request() req) {
    return await this.lessonTypesService.findAtUserSchool(+req.user.id)
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Patch(':id')
  @ApiResponse({
    description: 'Updates lesson type',
    type: () => LessonType,
  })
  @ApiBody({
    type: () => LessonTypeDto,
  })
  async update(@Param() id: number, @Body() body: LessonTypeUpdateDto) {
    return await this.lessonTypesService.update(+id, body)
  }
}
