import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SchoolsModule } from 'src/schools/schools.module';
import { UsersModule } from 'src/users/users.module';
import { LessonTypesController } from './lesson-types.controller';
import { lessonTypesProviders } from './lesson-types.providers';
import { LessonTypesService } from './lesson-types.service';

@Module({
  imports: [
    DatabaseModule,
    SchoolsModule,
    UsersModule,
  ],
  controllers: [LessonTypesController],
  providers: [LessonTypesService, ...lessonTypesProviders],
  exports: [LessonTypesService]
})
export class LessonTypesModule {}
