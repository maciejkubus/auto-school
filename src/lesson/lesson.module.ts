import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { InstructorsModule } from 'src/instructors/instructors.module';
import { LessonTypesModule } from 'src/lesson-types/lesson-types.module';
import { StudentsModule } from 'src/students/students.module';
import { TimeSlotsModule } from 'src/time-slots/time-slots.module';
import { UsersModule } from 'src/users/users.module';
import { LessonController } from './lesson.controller';
import { lessonProviders } from './lesson.providers';
import { LessonService } from './lesson.service';

@Module({
  imports: [
    DatabaseModule,
    TimeSlotsModule,
    LessonTypesModule,
    StudentsModule,
    InstructorsModule,
    UsersModule,
  ],
  controllers: [LessonController],
  providers: [LessonService, ...lessonProviders],
  exports: [LessonService]
})
export class LessonModule {}
