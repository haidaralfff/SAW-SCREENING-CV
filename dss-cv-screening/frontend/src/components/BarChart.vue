<script setup lang="ts">
import { computed } from 'vue';
import { BarChart as VueBarChart } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { RankingResult } from '../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  rankingResults: RankingResult[];
}

const props = defineProps<Props>();

const chartData = computed(() => {
  const data = props.rankingResults.slice(0, 10);
  return {
    labels: data.map(r => r.nama),
    datasets: [
      {
        label: 'Skor SAW',
        data: data.map(r => (r.nilai_akhir * 100).toFixed(2)),
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: '#10b981',
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(30, 41, 59, 0.95)',
      padding: 12,
      borderColor: '#475569',
      borderWidth: 1,
      titleColor: '#f1f5f9',
      bodyColor: '#cbd5e1',
      callbacks: {
        label: (context: any) => `${context.parsed.y}%`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        color: '#94a3b8',
        callback: (value: any) => `${value}%`,
      },
      grid: {
        color: '#334155',
        drawBorder: false,
      },
    },
    x: {
      ticks: {
        color: '#94a3b8',
        font: {
          size: 12,
        },
      },
      grid: {
        display: false,
      },
    },
  },
};
</script>

<template>
  <div class="chart-container">
    <VueBarChart :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
}
</style>
