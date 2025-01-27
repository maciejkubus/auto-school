import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsSchoolGuard } from 'src/users/guards/is-school.guard';
import { LessonDto } from './dto/lesson-dto';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Post()
  async create(@Body() body: LessonDto) {
    return await this.lessonService.create(body)
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.lessonService.delete(+id);
  }
}
