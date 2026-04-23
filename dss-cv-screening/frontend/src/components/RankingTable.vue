<template>
  <div class="space-y-4">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-bold text-slate-100">Ranking Kandidat</h2>
        <p class="text-sm text-slate-500 mt-0.5">Hasil perankingan menggunakan metode SAW</p>
      </div>
      <button
        @click="handleCalculate"
        :disabled="calculating"
        class="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        :class="calculating
          ? 'bg-slate-700 text-slate-400'
          : 'bg-emerald-500 hover:bg-emerald-400 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/20 active:translate-y-0'
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          :class="{ 'animate-spin': calculating }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        {{ calculating ? 'Menghitung...' : 'Hitung Ranking' }}
      </button>
    </div>

    <!-- Card -->
    <div class="bg-slate-800 rounded-xl border border-slate-700/60 overflow-hidden">

      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-3">
        <div class="w-8 h-8 border-2 border-slate-700 border-t-emerald-500 rounded-full animate-spin"></div>
        <p class="text-sm text-slate-500">Memuat data ranking...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="results.length === 0" class="flex flex-col items-center justify-center py-20 gap-4">
        <div class="w-16 h-16 rounded-full bg-slate-700/40 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div class="text-center">
          <p class="text-sm font-medium text-slate-400">Belum ada data ranking</p>
          <p class="text-xs text-slate-600 mt-1">Klik "Hitung Ranking" untuk memulai kalkulasi SAW</p>
        </div>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <!-- Summary bar -->
        <div class="flex items-center gap-6 px-5 py-3.5 bg-slate-900/30 border-b border-slate-700/60">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span class="text-xs text-slate-500">Total: <span class="text-slate-300 font-semibold">{{ results.length }} kandidat</span></span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
            <span class="text-xs text-slate-500">Terpilih: <span class="text-slate-300 font-semibold">{{ results[0]?.nama || '—' }}</span></span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-blue-500"></span>
            <span class="text-xs text-slate-500">
              Skor tertinggi:
              <span class="text-slate-300 font-semibold font-mono">
                {{ results[0] ? results[0].nilai_akhir.toFixed(3) : '—' }}
              </span>
            </span>
          </div>
        </div>

        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-700/60">
              <th class="th-cell w-20">Rank</th>
              <th class="th-cell">Nama Kandidat</th>
              <th class="th-cell">Posisi</th>
              <th class="th-cell text-right">Skor SAW</th>
              <th class="th-cell text-center">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-700/40">
            <tr
              v-for="(result, index) in results"
              :key="result.id"
              :class="[
                'transition-colors duration-150',
                index === 0
                  ? 'bg-emerald-500/5 hover:bg-emerald-500/8'
                  : 'hover:bg-slate-700/20'
              ]"
            >
              <!-- Rank -->
              <td class="td-cell">
                <div class="flex items-center gap-2.5">
                  <div
                    :class="[
                      'flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0 border',
                      index === 0
                        ? 'bg-amber-500/15 text-amber-400 border-amber-500/30 shadow-sm shadow-amber-500/10'
                        : index === 1
                        ? 'bg-slate-400/10 text-slate-400 border-slate-600/40'
                        : index === 2
                        ? 'bg-orange-900/20 text-orange-600 border-orange-800/30'
                        : 'bg-slate-800 text-slate-600 border-slate-700'
                    ]"
                  >
                    {{ result.ranking }}
                  </div>
                  <span class="text-lg" :title="getMedalLabel(index)">{{ getMedalIcon(index) }}</span>
                </div>
              </td>

              <!-- Name -->
              <td class="td-cell">
                <div class="flex items-center gap-2.5">
                  <div
                    :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                      index === 0
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-700 text-slate-400 border border-slate-600'
                    ]"
                  >
                    {{ result.nama.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <p
                      :class="[
                        'text-sm font-semibold',
                        index === 0 ? 'text-emerald-400' : 'text-slate-200'
                      ]"
                    >
                      {{ result.nama }}
                      <span
                        v-if="index === 0"
                        class="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 align-middle"
                      >
                        TERPILIH
                      </span>
                    </p>
                  </div>
                </div>
              </td>

              <!-- Position -->
              <td class="td-cell">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-700/60 text-slate-300 border border-slate-600/50">
                  {{ result.posisi_yang_dicari }}
                </span>
              </td>

              <!-- Score -->
              <td class="td-cell text-right">
                <span
                  :class="[
                    'text-sm font-mono font-bold',
                    index === 0 ? 'text-emerald-400' : 'text-slate-300'
                  ]"
                >
                  {{ result.nilai_akhir.toFixed(3) }}
                </span>
              </td>

              <!-- Status Badge -->
              <td class="td-cell text-center">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border',
                    getStatusClass(index)
                  ]"
                >
                  {{ getStatus(index) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RankingResult } from '../types';

interface Props {
  results: RankingResult[];
  loading?: boolean;
  calculating?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  calculate: [];
}>();

const handleCalculate = () => {
  emit('calculate');
};

const getMedalIcon = (index: number): string => {
  switch (index) {
    case 0: return '🥇';
    case 1: return '🥈';
    case 2: return '🥉';
    default: return '';
  }
};

const getMedalLabel = (index: number): string => {
  switch (index) {
    case 0: return 'Peringkat 1 - Emas';
    case 1: return 'Peringkat 2 - Perak';
    case 2: return 'Peringkat 3 - Perunggu';
    default: return '';
  }
};

const getStatus = (index: number): string => {
  if (index === 0) return 'Terpilih';
  if (index === 1) return 'Alternatif I';
  if (index === 2) return 'Alternatif II';
  return 'Cadangan';
};

const getStatusClass = (index: number): string => {
  if (index === 0) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
  if (index === 1) return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
  if (index === 2) return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  return 'bg-slate-700/50 text-slate-500 border-slate-600/40';
};
</script>

<style scoped>
.th-cell {
  padding: 11px 16px;
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  text-align: left;
  white-space: nowrap;
}

.td-cell {
  padding: 14px 16px;
  font-size: 14px;
  color: #cbd5e1;
  white-space: nowrap;
}
</style>
