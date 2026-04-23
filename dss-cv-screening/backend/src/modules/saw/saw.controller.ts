import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SawService } from './saw.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('saw')
export class SawController {
  constructor(private readonly sawService: SawService) {}

  @Post('calculate')
  async calculateRanking() {
    return this.sawService.calculateRanking();
  }

  @Get('ranking')
  async getRanking() {
    return this.sawService.getRanking();
  }
}
