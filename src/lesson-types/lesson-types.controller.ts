import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsSchoolGuard } from 'src/users/guards/is-school.guard';
import { LessonTypeDto } from './dto/lesson-type-dto';
import { LessonTypeUpdateDto } from './dto/lesson-type-update-dto';
import { LessonTypesService } from './lesson-types.service';

@Controller('lesson-types')
export class LessonTypesController {
  constructor(private readonly lessonTypesService: LessonTypesService) {}

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Post()
  async create(@Body() body: LessonTypeDto, @Request() req) {
    return await this.lessonTypesService.create(body, +req.user.id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async find(@Request() req) {
    return await this.lessonTypesService.findAtUserSchool(+req.user.id)
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Patch(':id')
  async update(@Param() id: number, @Body() body: LessonTypeUpdateDto, @Request() req) {
    return await this.lessonTypesService.update(+id, body)
  }
}
