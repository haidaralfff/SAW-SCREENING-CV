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
    if (!kandidats || kandidats.length === 0) {
      return []; // No candidates to rank
    }
    
    // Get all bobots (criteria weights and types)
    const bobots = await this.prisma.bobot.findMany();
    
    // Create bobot maps for easier access
    const bobotMap = new Map(bobots.map(b => [b.nama_kriteria, b.bobot]));
    const jenisMap = new Map(bobots.map(b => [b.nama_kriteria, b.jenis_kriteria]));

    // Helper to get max and min values safely
    const getExtremes = (field: keyof typeof kandidats[0]) => {
      const values = kandidats.map(k => Number(k[field]) || 0);
      return {
        max: Math.max(...values, 0.001), // Prevent division by zero
        min: Math.min(...values),
      };
    };

    // Find min and max for each criterion
    const extremes = {
      pendidikan: getExtremes('pendidikan'),
      pengalaman: getExtremes('pengalaman'),
      skill_analisis: getExtremes('skill_analisis'),
      sertifikasi: getExtremes('sertifikasi'),
    };

    // Helper for normalization
    const normalize = (value: number, criterion: keyof typeof extremes) => {
      const isBenefit = (jenisMap.get(criterion) || 'benefit') === 'benefit';
      const max = extremes[criterion].max;
      const min = extremes[criterion].min === 0 ? 0.001 : extremes[criterion].min; // safe min

      if (isBenefit) {
        return value / max;
      } else {
        return value === 0 ? 0 : min / value; // Cost formula
      }
    };

    // Step 2: Normalize and calculate weighted score
    const hasil = kandidats.map(kandidat => {
      const normalized = {
        pendidikan: normalize(kandidat.pendidikan, 'pendidikan'),
        pengalaman: normalize(kandidat.pengalaman, 'pengalaman'),
        skill_analisis: normalize(kandidat.skill_analisis, 'skill_analisis'),
        sertifikasi: normalize(kandidat.sertifikasi, 'sertifikasi'),
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

    // Step 4: Update database with ranking and scores using Transaction
    const updates = hasil.map((h, i) => 
      this.prisma.kandidat.update({
        where: { id: h.id },
        data: {
          nilai_akhir: h.nilai_akhir,
          ranking: i + 1,
        },
      })
    );

    await this.prisma.$transaction(updates);

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
