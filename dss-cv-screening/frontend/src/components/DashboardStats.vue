<script setup lang="ts">
import { computed } from 'vue';
import BarChart from './BarChart.vue';
import DoughnutChart from './DoughnutChart.vue';
import type { Kandidat, RankingResult, Bobot } from '../types';

interface Props {
  candidates: Kandidat[];
  rankingResults: RankingResult[];
  bobots: Bobot[];
}

const props = defineProps<Props>();

const totalKandidats = computed(() => props.candidates.length);

const averageScore = computed(() => {
  if (props.rankingResults.length === 0) return '0.000';
  const sum = props.rankingResults.reduce((acc, r) => acc + r.nilai_akhir, 0);
  return (sum / props.rankingResults.length).toFixed(3);
});

const highestScore = computed(() => {
  if (props.rankingResults.length === 0) return '0.000';
  const max = Math.max(...props.rankingResults.map(r => r.nilai_akhir));
  return max.toFixed(3);
});

const lowestScore = computed(() => {
  if (props.rankingResults.length === 0) return '0.000';
  const min = Math.min(...props.rankingResults.map(r => r.nilai_akhir));
  return min.toFixed(3);
});

const topCandidate = computed(() => {
  if (props.rankingResults.length === 0) return null;
  return props.rankingResults.reduce((best, r) => r.nilai_akhir > best.nilai_akhir ? r : best);
});

const statCards = computed(() => [
  {
    id: 'total',
    label: 'Total Kandidat',
    value: String(totalKandidats.value),
    suffix: '',
    sub: 'Terdaftar di sistem',
    color: 'emerald',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
  },
  {
    id: 'avg',
    label: 'Rata-rata Skor',
    value: averageScore.value,
    suffix: '',
    sub: 'Rata-rata nilai SAW',
    color: 'blue',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`,
  },
  {
    id: 'max',
    label: 'Skor Tertinggi',
    value: highestScore.value,
    suffix: '',
    sub: topCandidate.value ? topCandidate.value.nama : '-',
    color: 'emerald',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>`,
    highlight: true,
  },
  {
    id: 'min',
    label: 'Skor Terendah',
    value: lowestScore.value,
    suffix: '',
    sub: 'Nilai minimum SAW',
    color: 'slate',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M13 17H5m0 0V9m0 8l8-8 4 4 6-6" /></svg>`,
  },
]);

const iconBg: Record<string, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-400',
  blue: 'bg-blue-500/10 text-blue-400',
  slate: 'bg-slate-600/40 text-slate-400',
};
</script>

<template>
  <div class="space-y-6">
    <!-- Section header -->
    <div>
      <h2 class="text-lg font-bold text-slate-100">Analytics Overview</h2>
      <p class="text-sm text-slate-500 mt-0.5">Ringkasan performa screening kandidat</p>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <div
        v-for="card in statCards"
        :key="card.id"
        :class="[
          'relative bg-slate-800 rounded-xl border p-5 group cursor-default overflow-hidden',
          card.highlight
            ? 'border-emerald-500/30 shadow-emerald-500/5 shadow-lg'
            : 'border-slate-700/60 hover:border-slate-600/80'
        ]"
      >
        <!-- Glow for highlight card -->
        <div
          v-if="card.highlight"
          class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"
        ></div>

        <div class="flex items-start justify-between">
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">{{ card.label }}</p>
            <p
              :class="[
                'text-3xl font-bold tracking-tight',
                card.highlight ? 'text-emerald-400' : 'text-slate-100'
              ]"
            >
              {{ card.value }}
              <span class="text-base font-medium text-slate-500">{{ card.suffix }}</span>
            </p>
            <p class="text-xs text-slate-500 mt-2 truncate max-w-[150px]">{{ card.sub }}</p>
          </div>
          <div :class="['w-10 h-10 rounded-lg flex items-center justify-center shrink-0', iconBg[card.color]]" v-html="card.icon"></div>
        </div>

        <!-- Bottom progress bar decoration -->
        <div
          :class="[
            'absolute bottom-0 left-0 h-0.5 w-full',
            card.highlight ? 'bg-gradient-to-r from-emerald-500 to-emerald-500/0' : 'bg-gradient-to-r from-slate-700 to-transparent opacity-0 group-hover:opacity-100'
          ]"
        ></div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Bar Chart -->
      <div class="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700/60 p-5">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h3 class="text-sm font-bold text-slate-100">Perbandingan Skor Kandidat</h3>
            <p class="text-xs text-slate-500 mt-0.5">Top kandidat berdasarkan nilai SAW</p>
          </div>
          <span class="px-2.5 py-1 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
            SAW Score
          </span>
        </div>
        <div v-if="rankingResults.length === 0" class="flex flex-col items-center justify-center h-48 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-slate-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p class="text-sm text-slate-500">Belum ada data ranking</p>
          <p class="text-xs text-slate-600 mt-1">Hitung ranking terlebih dahulu</p>
        </div>
        <BarChart v-else :ranking-results="rankingResults" />
      </div>

      <!-- Doughnut Chart -->
      <div class="bg-slate-800 rounded-xl border border-slate-700/60 p-5">
        <div class="mb-5">
          <h3 class="text-sm font-bold text-slate-100">Distribusi Bobot Kriteria</h3>
          <p class="text-xs text-slate-500 mt-0.5">Persentase bobot tiap kriteria</p>
        </div>
        <DoughnutChart :bobots="bobots" />
      </div>
    </div>

    <!-- Ranking Preview + Score Indicators -->
    <div class="bg-slate-800 rounded-xl border border-slate-700/60 p-5">
      <div class="flex items-center justify-between mb-5">
        <div>
          <h3 class="text-sm font-bold text-slate-100">Indikator Skor Kandidat</h3>
          <p class="text-xs text-slate-500 mt-0.5">Progress bar skor relatif tiap kandidat</p>
        </div>
        <span class="text-xs text-slate-500">{{ rankingResults.length }} kandidat</span>
      </div>

      <div v-if="rankingResults.length === 0" class="flex flex-col items-center justify-center h-24 text-center">
        <p class="text-sm text-slate-500">Belum ada data untuk ditampilkan</p>
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="(result, index) in rankingResults.slice(0, 8)"
          :key="result.id"
          class="flex items-center gap-4"
        >
          <!-- Rank badge -->
          <div
            :class="[
              'flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0',
              index === 0 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : index === 1 ? 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
              : index === 2 ? 'bg-orange-800/20 text-orange-600 border border-orange-800/30'
              : 'bg-slate-800 text-slate-600 border border-slate-700'
            ]"
          >
            {{ result.ranking }}
          </div>

          <!-- Name -->
          <div class="w-28 shrink-0">
            <p class="text-xs font-medium text-slate-300 truncate">{{ result.nama }}</p>
          </div>

          <!-- Progress bar -->
          <div class="flex-1 bg-slate-700/40 rounded-full h-2 overflow-hidden">
            <div
              :class="[
                'h-2 rounded-full transition-all duration-700',
                index === 0 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                : index <= 2 ? 'bg-gradient-to-r from-blue-500 to-blue-400'
                : 'bg-slate-600'
              ]"
              :style="{ width: `${(result.nilai_akhir / Math.max(...rankingResults.map(r => r.nilai_akhir))) * 100}%` }"
            ></div>
          </div>

          <!-- Score -->
          <div class="w-16 text-right shrink-0">
            <span
              :class="[
                'text-xs font-mono font-semibold',
                index === 0 ? 'text-emerald-400' : 'text-slate-400'
              ]"
            >
              {{ result.nilai_akhir.toFixed(3) }}
            </span>
          </div>
        </div>

        <p v-if="rankingResults.length > 8" class="text-xs text-slate-600 text-center pt-2">
          + {{ rankingResults.length - 8 }} kandidat lainnya
        </p>
      </div>
    </div>
  </div>
</template>
