<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-slate-100">📋 Daftar Kandidat</h2>
      <button @click="$emit('add')" class="btn-add">
        ➕ Tambah Kandidat
      </button>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="inline-block">
        <div class="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
      </div>
      <p class="mt-4 text-slate-400">Memuat data...</p>
    </div>

    <div v-else-if="candidates.length === 0" class="text-center py-12 bg-slate-800/50 rounded-lg border border-slate-700">
      <p class="text-slate-400">📭 Tidak ada data kandidat</p>
      <p class="text-slate-500 text-sm mt-2">Klik tombol "Tambah Kandidat" untuk menambahkan kandidat baru</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-slate-700">
            <th class="table-header">Nama</th>
            <th class="table-header">Email</th>
            <th class="table-header">Posisi</th>
            <th class="table-header">Nilai Akhir</th>
            <th class="table-header">Ranking</th>
            <th class="table-header">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="candidate in candidates"
            :key="candidate.id"
            class="border-b border-slate-700 hover:bg-slate-800/50 transition-colors"
          >
            <td class="table-cell font-medium text-slate-100">{{ candidate.nama }}</td>
            <td class="table-cell text-slate-400 text-sm">{{ candidate.email }}</td>
            <td class="table-cell text-slate-300">{{ candidate.posisi_yang_dicari }}</td>
            <td class="table-cell">
              <span v-if="candidate.nilai_akhir" class="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-medium text-sm">
                {{ (candidate.nilai_akhir * 100).toFixed(2) }}%
              </span>
              <span v-else class="text-slate-500">-</span>
            </td>
            <td class="table-cell">
              <span v-if="candidate.ranking" class="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-medium text-sm">
                #{{ candidate.ranking }}
              </span>
              <span v-else class="text-slate-500">-</span>
            </td>
            <td class="table-cell">
              <div class="flex gap-2">
                <button
                  @click="$emit('edit', candidate)"
                  class="btn-action edit"
                  title="Edit kandidat"
                >
                  ✏️
                </button>
                <button
                  @click="$emit('delete', candidate.id)"
                  class="btn-action delete"
                  title="Hapus kandidat"
                >
                  🗑️
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
import { Kandidat } from '../types';

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
.btn-add {
  padding: 10px 20px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-add:hover {
  background: #059669;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

table {
  background: #1e293b;
  border-radius: 8px;
  border: 1px solid #334155;
  border-collapse: collapse;
  overflow: hidden;
}

thead {
  background: #0f172a;
}

.table-header {
  padding: 14px 16px;
  text-align: left;
  font-weight: 600;
  color: #cbd5e1;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #334155;
}

.table-cell {
  padding: 14px 16px;
  color: #cbd5e1;
  font-size: 14px;
}

.btn-action {
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
}

.btn-action.edit {
  background: #3b82f6/20;
  color: #3b82f6;
}

.btn-action.edit:hover {
  background: #3b82f6/40;
  transform: scale(1.05);
}

.btn-action.delete {
  background: #ef4444/20;
  color: #ef4444;
}

.btn-action.delete:hover {
  background: #ef4444/40;
  transform: scale(1.05);
}
</style>
