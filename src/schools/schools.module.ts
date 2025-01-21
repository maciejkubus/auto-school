import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { SchoolsController } from './schools.controller';
import { schoolsProviders } from './schools.providers';
import { SchoolsService } from './schools.service';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [SchoolsController],
  providers: [SchoolsService, ...schoolsProviders],
  exports: [SchoolsService]
})
export class SchoolsModule {}
