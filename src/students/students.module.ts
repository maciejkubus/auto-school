import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { studentsProviders } from './schools.providers';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [StudentsController],
  providers: [StudentsService, ...studentsProviders],
  exports: [StudentsService]
})
export class StudentsModule {}
