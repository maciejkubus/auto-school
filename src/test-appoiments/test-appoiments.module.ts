import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { InstructorsModule } from 'src/instructors/instructors.module';
import { SchoolsModule } from 'src/schools/schools.module';
import { StudentsModule } from 'src/students/students.module';
import { TestsModule } from 'src/tests/tests.module';
import { UsersModule } from 'src/users/users.module';
import { TestAppoimentsController } from './test-appoiments.controller';
import { testAppoimentsProviders } from './test-appoiments.providers';
import { TestAppoimentsService } from './test-appoiments.service';

@Module({
  imports: [
    DatabaseModule,
    TestsModule,
    InstructorsModule,
    StudentsModule,
    SchoolsModule,
    UsersModule,
  ],
  controllers: [TestAppoimentsController],
  providers: [TestAppoimentsService, ...testAppoimentsProviders],
})
export class TestAppoimentsModule {}
