import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BobotController } from './bobot.controller';
import { BobotService } from './bobot.service';

@Module({
  controllers: [BobotController],
  providers: [BobotService, PrismaService],
  exports: [BobotService],
})
export class BobotModule {}
