import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBobotDto, UpdateBobotDto } from './dto';

@Injectable()
export class BobotService {
  constructor(private prisma: PrismaService) {}

  async create(createBobotDto: CreateBobotDto) {
    return this.prisma.bobot.create({
      data: createBobotDto,
    });
  }

  async findAll() {
    return this.prisma.bobot.findMany();
  }

  async findOne(id: string) {
    return this.prisma.bobot.findUnique({
      where: { id },
    });
  }

  async findByKriteria(nama_kriteria: string) {
    return this.prisma.bobot.findUnique({
      where: { nama_kriteria },
    });
  }

  async update(id: string, updateBobotDto: UpdateBobotDto) {
    return this.prisma.bobot.update({
      where: { id },
      data: updateBobotDto,
    });
  }

  async remove(id: string) {
    return this.prisma.bobot.delete({
      where: { id },
    });
  }
}
