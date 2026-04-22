import { Controller, Get, Post } from '@nestjs/common';
import { SawService } from './saw.service';

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
