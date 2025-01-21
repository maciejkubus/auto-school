import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { InstructorsModule } from 'src/instructors/instructors.module';
import { SchoolsModule } from 'src/schools/schools.module';
import { StudentsModule } from 'src/students/students.module';
import { UsersModule } from 'src/users/users.module';
import { timeSlotsProviders } from './time-slot.providers';
import { TimeSlotsController } from './time-slots.controller';
import { TimeSlotsService } from './time-slots.service';

@Module({
  imports: [
    DatabaseModule,
    InstructorsModule,
    StudentsModule,
    SchoolsModule,
    UsersModule,
  ],
  controllers: [TimeSlotsController],
  providers: [TimeSlotsService, ...timeSlotsProviders],
  exports: [TimeSlotsService]
})
export class TimeSlotsModule {}
