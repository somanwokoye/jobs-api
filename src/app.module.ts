import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.modules';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';



@Module({
  imports: [JobsModule, MongooseModule.forRoot(config.mongoURI)],
  controllers: [],
  providers: [],
})
export class AppModule {}
