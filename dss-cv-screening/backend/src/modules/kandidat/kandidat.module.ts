import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { KandidatController } from './kandidat.controller';
import { KandidatService } from './kandidat.service';

@Module({
  controllers: [KandidatController],
  providers: [KandidatService, PrismaService],
  exports: [KandidatService],
})
export class KandidatModule {}
