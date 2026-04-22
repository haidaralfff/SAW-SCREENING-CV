<template>
  <div class="ranking-container">
    <h2>Hasil Ranking (SAW Method)</h2>

    <button @click="handleCalculate" :disabled="calculating" class="btn-calculate">
      {{ calculating ? 'Menghitung...' : 'Hitung Ranking' }}
    </button>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="results.length === 0" class="empty">
      Tidak ada hasil ranking. Hitung terlebih dahulu.
    </div>
    <table v-else class="table">
      <thead>
        <tr>
          <th>Ranking</th>
          <th>Nama Kandidat</th>
          <th>Posisi</th>
          <th>Skor SAW</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(result, index) in results" :key="result.id" :class="getRowClass(index)">
          <td class="rank">
            <span class="medal">{{ getMedalIcon(index) }}</span>
            {{ result.ranking }}
          </td>
          <td>{{ result.nama }}</td>
          <td>{{ result.posisi_yang_dicari }}</td>
          <td class="score">{{ (result.nilai_akhir * 100).toFixed(2) }}%</td>
          <td>
            <span :class="`badge ${getStatusClass(index)}`">
              {{ getStatus(index) }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { RankingResult } from '../types';

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

const getMedalIcon = (index: number) => {
  switch (index) {
    case 0:
      return '🥇';
    case 1:
      return '🥈';
    case 2:
      return '🥉';
    default:
      return '📌';
  }
};

const getRowClass = (index: number) => {
  if (index < 3) return `rank-${index + 1}`;
  return '';
};

const getStatus = (index: number) => {
  if (index === 0) return 'Terpilih';
  if (index === 1) return 'Alternatif 1';
  if (index === 2) return 'Alternatif 2';
  return 'Cadangan';
};

const getStatusClass = (index: number) => {
  if (index === 0) return 'selected';
  if (index === 1) return 'alternative-1';
  if (index === 2) return 'alternative-2';
  return 'backup';
};
</script>

<style scoped>
.ranking-container {
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.btn-calculate {
  padding: 12px 24px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 20px;
  transition: background 0.3s ease;
  font-size: 14px;
}

.btn-calculate:hover:not(:disabled) {
  background: #45a049;
}

.btn-calculate:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.loading,
.empty {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 16px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

th {
  background: #f5f5f5;
  padding: 14px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #ddd;
}

td {
  padding: 14px;
  border-bottom: 1px solid #eee;
}

.rank-1 {
  background: #fff8e1;
  font-weight: 600;
}

.rank-2 {
  background: #f0f4f8;
}

.rank-3 {
  background: #fbe9e7;
}

.rank {
  font-weight: 600;
  font-size: 16px;
}

.medal {
  margin-right: 8px;
}

.score {
  font-weight: 600;
  color: #2196F3;
  font-size: 15px;
}

.badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.badge.selected {
  background: #c8e6c9;
  color: #2e7d32;
}

.badge.alternative-1 {
  background: #bbdefb;
  color: #1565c0;
}

.badge.alternative-2 {
  background: #ffe0b2;
  color: #e65100;
}

.badge.backup {
  background: #f0f0f0;
  color: #666;
}
</style>
