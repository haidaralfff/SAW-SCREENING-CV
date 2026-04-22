import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SawService {
  constructor(private prisma: PrismaService) {}

  /**
   * SAW (Simple Additive Weighting) Algorithm
   * 1. Normalisasi nilai (0-100 menjadi 0-1)
   * 2. Hitung skor terbobot
   * 3. Urutkan berdasarkan skor (descending)
   */
  async calculateRanking() {
    // Get all candidates
    const kandidats = await this.prisma.kandidat.findMany();
    
    // Get all bobots (criteria weights)
    const bobots = await this.prisma.bobot.findMany();
    
    // Create bobot map for easier access
    const bobotMap = new Map(bobots.map(b => [b.nama_kriteria, b.bobot]));

    // Criteria names
    const kriteria = ['pendidikan', 'pengalaman', 'skill_analisis', 'sertifikasi'];

    // Step 1: Find max values for normalization
    const maxValues = {
      pendidikan: Math.max(...kandidats.map(k => k.pendidikan), 1),
      pengalaman: Math.max(...kandidats.map(k => k.pengalaman), 1),
      skill_analisis: Math.max(...kandidats.map(k => k.skill_analisis), 1),
      sertifikasi: Math.max(...kandidats.map(k => k.sertifikasi), 1),
    };

    // Step 2: Normalize and calculate weighted score
    const hasil = kandidats.map(kandidat => {
      // Normalize values (benefit criteria: value/max)
      const normalized = {
        pendidikan: kandidat.pendidikan / maxValues.pendidikan,
        pengalaman: kandidat.pengalaman / maxValues.pengalaman,
        skill_analisis: kandidat.skill_analisis / maxValues.skill_analisis,
        sertifikasi: kandidat.sertifikasi / maxValues.sertifikasi,
      };

      // Calculate weighted score
      const nilaiAkhir = 
        (normalized.pendidikan * (bobotMap.get('pendidikan') || 0.25)) +
        (normalized.pengalaman * (bobotMap.get('pengalaman') || 0.25)) +
        (normalized.skill_analisis * (bobotMap.get('skill_analisis') || 0.25)) +
        (normalized.sertifikasi * (bobotMap.get('sertifikasi') || 0.25));

      return {
        id: kandidat.id,
        nama: kandidat.nama,
        nilai_akhir: Math.round(nilaiAkhir * 100) / 100, // Round to 2 decimals
      };
    });

    // Step 3: Sort by score (descending) and assign ranking
    hasil.sort((a, b) => b.nilai_akhir - a.nilai_akhir);

    // Step 4: Update database with ranking and scores
    for (let i = 0; i < hasil.length; i++) {
      await this.prisma.kandidat.update({
        where: { id: hasil[i].id },
        data: {
          nilai_akhir: hasil[i].nilai_akhir,
          ranking: i + 1,
        },
      });
    }

    return hasil;
  }

  async getRanking() {
    return this.prisma.kandidat.findMany({
      where: { ranking: { not: null } },
      orderBy: { ranking: 'asc' },
      select: {
        id: true,
        nama: true,
        posisi_yang_dicari: true,
        nilai_akhir: true,
        ranking: true,
      },
    });
  }
}
