import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsSchoolGuard } from 'src/users/guards/is-school.guard';
import { LessonDto } from './dto/lesson-dto';
import { Lesson } from './entity/lesson.entity';
import { LessonService } from './lesson.service';

@Controller('lesson')
@ApiTags('Lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Post()
  @ApiResponse({
    description: 'Create lesson',
    type: () => Lesson,
  })
  async create(@Body() body: LessonDto) {
    return await this.lessonService.create(body)
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Delete(':id')
  @ApiResponse({
    description: 'Removes lesson by id',
    type: () => Lesson,
  })
  remove(@Param('id') id: number) {
    return this.lessonService.delete(+id);
  }
}
