import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKandidatDto, UpdateKandidatDto } from './dto';

@Injectable()
export class KandidatService {
  constructor(private prisma: PrismaService) {}

  async create(createKandidatDto: CreateKandidatDto) {
    return this.prisma.kandidat.create({
      data: createKandidatDto,
    });
  }

  async findAll() {
    return this.prisma.kandidat.findMany({
      orderBy: { ranking: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.kandidat.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateKandidatDto: UpdateKandidatDto) {
    return this.prisma.kandidat.update({
      where: { id },
      data: updateKandidatDto,
    });
  }

  async remove(id: string) {
    return this.prisma.kandidat.delete({
      where: { id },
    });
  }

  async updateScore(id: string, nilai_akhir: number, ranking: number) {
    return this.prisma.kandidat.update({
      where: { id },
      data: { nilai_akhir, ranking },
    });
  }
}
