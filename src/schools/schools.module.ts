import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SchoolsController } from './schools.controller';
import { schoolsProviders } from './schools.providers';
import { SchoolsService } from './schools.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SchoolsController],
  providers: [SchoolsService, ...schoolsProviders],
  exports: [SchoolsService]
})
export class SchoolsModule {}
