import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { SchoolsModule } from './schools/schools.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthenticationModule,
    UsersModule,
    SchoolsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
