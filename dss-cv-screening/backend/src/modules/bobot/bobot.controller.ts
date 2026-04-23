import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BobotService } from './bobot.service';
import { CreateBobotDto, UpdateBobotDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('bobot')
export class BobotController {
  constructor(private readonly bobotService: BobotService) {}

  @Post()
  create(@Body() createBobotDto: CreateBobotDto) {
    return this.bobotService.create(createBobotDto);
  }

  @Get()
  findAll() {
    return this.bobotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bobotService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBobotDto: UpdateBobotDto) {
    return this.bobotService.update(id, updateBobotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bobotService.remove(id);
  }
}
