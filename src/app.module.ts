import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { SchoolsModule } from './schools/schools.module';
import { InstructorsModule } from './instructors/instructors.module';
import { StudentsModule } from './students/students.module';
import { TestsModule } from './tests/tests.module';
import { TestAppoimentsModule } from './test-appoiments/test-appoiments.module';
import { LessonTypesModule } from './lesson-types/lesson-types.module';
import { TimeSlotsModule } from './time-slots/time-slots.module';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthenticationModule,
    UsersModule,
    SchoolsModule,
    InstructorsModule,
    StudentsModule,
    TestsModule,
    TestAppoimentsModule,
    LessonTypesModule,
    TimeSlotsModule,
    LessonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
