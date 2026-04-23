import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('db')
  async checkDb() {
    try {
      const totalKandidat = await this.prisma.kandidat.count();
      return {
        status: 'ok',
        database: 'connected',
        totalKandidat,
      };
    } catch (error) {
      return {
        status: 'error',
        database: 'disconnected',
        message: error.message,
      };
    }
  }
}
