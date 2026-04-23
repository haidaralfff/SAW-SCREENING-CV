<template>
  <div class="bg-slate-800 rounded-xl border border-slate-700/60 overflow-hidden">
    <!-- Header -->
    <div class="flex items-center justify-between px-5 py-4 border-b border-slate-700/60">
      <div class="flex items-center gap-3">
        <h2 class="text-sm font-bold text-slate-100">Daftar Kandidat</h2>
        <span class="px-2 py-0.5 text-[11px] font-semibold bg-slate-700 text-slate-400 rounded-full">
          {{ candidates.length }} kandidat
        </span>
      </div>
      <button
        @click="$emit('add')"
        class="flex items-center gap-2 px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/20 active:translate-y-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Tambah Kandidat
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-16 gap-3">
      <div class="w-8 h-8 border-2 border-slate-700 border-t-emerald-500 rounded-full animate-spin"></div>
      <p class="text-sm text-slate-500">Memuat data kandidat...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="candidates.length === 0" class="flex flex-col items-center justify-center py-16 gap-3">
      <div class="w-14 h-14 rounded-full bg-slate-700/50 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <div class="text-center">
        <p class="text-sm font-medium text-slate-400">Belum ada kandidat</p>
        <p class="text-xs text-slate-600 mt-1">Klik "Tambah Kandidat" untuk memulai</p>
      </div>
    </div>

    <!-- Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-slate-700/60 bg-slate-900/30">
            <th class="th-cell">Nama</th>
            <th class="th-cell">Email</th>
            <th class="th-cell">Posisi</th>
            <th class="th-cell text-center">Nilai Akhir</th>
            <th class="th-cell text-center">Ranking</th>
            <th class="th-cell text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-700/40">
          <tr
            v-for="candidate in candidates"
            :key="candidate.id"
            class="hover:bg-slate-700/20 transition-colors duration-150 group"
          >
            <td class="td-cell">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                  {{ candidate.nama.charAt(0).toUpperCase() }}
                </div>
                <span class="text-sm font-medium text-slate-200">{{ candidate.nama }}</span>
              </div>
            </td>
            <td class="td-cell">
              <span class="text-sm text-slate-500">{{ candidate.email }}</span>
            </td>
            <td class="td-cell">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-700/60 text-slate-300 border border-slate-600/50">
                {{ candidate.posisi_yang_dicari }}
              </span>
            </td>
            <td class="td-cell text-center">
              <span
                v-if="candidate.nilai_akhir"
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              >
                {{ (candidate.nilai_akhir).toFixed(3) }}
              </span>
              <span v-else class="text-slate-600 text-xs">—</span>
            </td>
            <td class="td-cell text-center">
              <span
                v-if="candidate.ranking"
                :class="[
                  'inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold border',
                  candidate.ranking === 1
                    ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                ]"
              >
                {{ candidate.ranking }}
              </span>
              <span v-else class="text-slate-600 text-xs">—</span>
            </td>
            <td class="td-cell">
              <div class="flex items-center justify-end gap-1.5">
                <button
                  @click="$emit('edit', candidate)"
                  class="p-1.5 rounded-md text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-150"
                  title="Edit kandidat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  @click="$emit('delete', candidate.id)"
                  class="p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
                  title="Hapus kandidat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Kandidat } from '../types';

defineProps<{
  candidates: Kandidat[];
  loading?: boolean;
}>();

defineEmits<{
  add: [];
  edit: [candidate: Kandidat];
  delete: [id: string];
}>();
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
  padding: 13px 16px;
  font-size: 14px;
  color: #cbd5e1;
  white-space: nowrap;
}
</style>
