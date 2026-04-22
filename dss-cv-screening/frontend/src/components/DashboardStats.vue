<script setup lang="ts">
import { computed } from 'vue';
import BarChart from './BarChart.vue';
import DoughnutChart from './DoughnutChart.vue';
import { Kandidat, RankingResult, Bobot } from '../types';

interface Props {
  candidates: Kandidat[];
  rankingResults: RankingResult[];
  bobots: Bobot[];
}

const props = defineProps<Props>();

const totalKandidats = computed(() => props.candidates.length);

const averageScore = computed(() => {
  if (props.rankingResults.length === 0) return 0;
  const sum = props.rankingResults.reduce((acc, r) => acc + r.nilai_akhir, 0);
  return (sum / props.rankingResults.length * 100).toFixed(2);
});

const highestScore = computed(() => {
  if (props.rankingResults.length === 0) return 0;
  const max = Math.max(...props.rankingResults.map(r => r.nilai_akhir));
  return (max * 100).toFixed(2);
});

const lowestScore = computed(() => {
  if (props.rankingResults.length === 0) return 0;
  const min = Math.min(...props.rankingResults.map(r => r.nilai_akhir));
  return (min * 100).toFixed(2);
});
</script>

<template>
  <div class="space-y-6">
    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Kandidat -->
      <div class="stat-card">
        <div class="stat-icon emerald">👥</div>
        <div class="stat-content">
          <p class="stat-label">Total Kandidat</p>
          <p class="stat-value">{{ totalKandidats }}</p>
        </div>
      </div>

      <!-- Average Score -->
      <div class="stat-card">
        <div class="stat-icon blue">📊</div>
        <div class="stat-content">
          <p class="stat-label">Rata-rata Skor</p>
          <p class="stat-value">{{ averageScore }}%</p>
        </div>
      </div>

      <!-- Highest Score -->
      <div class="stat-card">
        <div class="stat-icon green">⬆️</div>
        <div class="stat-content">
          <p class="stat-label">Skor Tertinggi</p>
          <p class="stat-value">{{ highestScore }}%</p>
        </div>
      </div>

      <!-- Lowest Score -->
      <div class="stat-card">
        <div class="stat-icon orange">⬇️</div>
        <div class="stat-content">
          <p class="stat-label">Skor Terendah</p>
          <p class="stat-value">{{ lowestScore }}%</p>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Bar Chart -->
      <div class="lg:col-span-2">
        <div class="chart-card">
          <h3 class="chart-title">Perbandingan Skor Kandidat</h3>
          <BarChart :ranking-results="rankingResults" />
        </div>
      </div>

      <!-- Doughnut Chart -->
      <div>
        <div class="chart-card">
          <h3 class="chart-title">Distribusi Bobot Kriteria</h3>
          <DoughnutChart :bobots="bobots" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #10b981, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover {
  border-color: #475569;
  transform: translateY(-2px);
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-icon {
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 8px;
  flex-shrink: 0;
}

.stat-icon.emerald {
  background: rgba(16, 185, 129, 0.1);
}

.stat-icon.blue {
  background: rgba(59, 130, 246, 0.1);
}

.stat-icon.green {
  background: rgba(34, 197, 94, 0.1);
}

.stat-icon.orange {
  background: rgba(249, 115, 22, 0.1);
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 13px;
  color: #94a3b8;
  margin: 0;
  margin-bottom: 4px;
  font-weight: 500;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0;
}

.chart-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
}

.chart-card:hover {
  border-color: #475569;
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
