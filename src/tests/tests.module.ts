import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SchoolsModule } from 'src/schools/schools.module';
import { UsersModule } from 'src/users/users.module';
import { TestsController } from './tests.controller';
import { testsProviders } from './tests.providers';
import { TestsService } from './tests.service';

@Module({
  imports: [
    DatabaseModule,
    SchoolsModule,
    UsersModule,
  ],
  controllers: [TestsController],
  providers: [TestsService, ...testsProviders],
})
export class TestsModule {}
