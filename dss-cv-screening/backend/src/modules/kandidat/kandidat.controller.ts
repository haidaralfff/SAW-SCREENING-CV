import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { KandidatService } from './kandidat.service';
import { CreateKandidatDto, UpdateKandidatDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('kandidat')
export class KandidatController {
  constructor(private readonly kandidatService: KandidatService) {}

  @Post()
  create(@Body() createKandidatDto: CreateKandidatDto) {
    return this.kandidatService.create(createKandidatDto);
  }

  @Get()
  findAll() {
    return this.kandidatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kandidatService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateKandidatDto: UpdateKandidatDto) {
    return this.kandidatService.update(id, updateKandidatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kandidatService.remove(id);
  }
}
