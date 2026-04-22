import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { KandidatModule } from '../kandidat/kandidat.module';
import { BobotModule } from '../bobot/bobot.module';
import { SawController } from './saw.controller';
import { SawService } from './saw.service';

@Module({
  imports: [KandidatModule, BobotModule],
  controllers: [SawController],
  providers: [SawService, PrismaService],
})
export class SawModule {}
