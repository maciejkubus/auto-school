import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { InstructorsController } from './instructors.controller';
import { instructorsProviders } from './instructors.providers';
import { InstructorsService } from './instructors.service';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [InstructorsController],
  providers: [InstructorsService, ...instructorsProviders],
  exports: [InstructorsService]
})
export class InstructorsModule {}
