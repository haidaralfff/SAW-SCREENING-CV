import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KandidatModule } from './modules/kandidat/kandidat.module';
import { BobotModule } from './modules/bobot/bobot.module';
import { SawModule } from './modules/saw/saw.module';

@Module({
  imports: [KandidatModule, BobotModule, SawModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
