import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KandidatModule } from './modules/kandidat/kandidat.module';
import { BobotModule } from './modules/bobot/bobot.module';
import { SawModule } from './modules/saw/saw.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    HealthModule,
    KandidatModule,
    BobotModule,
    SawModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
