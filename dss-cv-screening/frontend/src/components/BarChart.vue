<script setup lang="ts">
import { computed } from 'vue';
import { Bar as VueBarChart } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { RankingResult } from '../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  rankingResults: RankingResult[];
}

const props = defineProps<Props>();

const chartData = computed(() => {
  const data = props.rankingResults.slice(0, 10);
  const maxVal = Math.max(...data.map(r => r.nilai_akhir));
  
  return {
    labels: data.map(r => r.nama),
    datasets: [
      {
        label: 'Skor SAW',
        data: data.map(r => parseFloat(r.nilai_akhir.toFixed(3))),
        backgroundColor: data.map((r, i) =>
          i === 0 ? 'rgba(16, 185, 129, 0.85)' : 'rgba(51, 65, 85, 0.9)'
        ),
        borderColor: data.map((r, i) =>
          i === 0 ? '#10b981' : '#475569'
        ),
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
        hoverBackgroundColor: data.map((r, i) =>
          i === 0 ? 'rgba(16, 185, 129, 1)' : 'rgba(71, 85, 105, 1)'
        ),
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#1e293b',
      padding: 12,
      borderColor: '#334155',
      borderWidth: 1,
      titleColor: '#f1f5f9',
      bodyColor: '#94a3b8',
      titleFont: { size: 12, weight: 'bold' as const },
      bodyFont: { size: 13 },
      callbacks: {
        label: (context: any) => `  Skor: ${context.parsed.y.toFixed(3)}`,
      },
      displayColors: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: '#64748b',
        font: { size: 11 },
        callback: (value: any) => value.toFixed(2),
      },
      grid: {
        color: 'rgba(51, 65, 85, 0.4)',
      },
      border: {
        dash: [4, 4],
        color: 'transparent',
      },
    },
    x: {
      ticks: {
        color: '#64748b',
        font: { size: 11 },
        maxRotation: 30,
      },
      grid: {
        display: false,
      },
      border: {
        color: '#334155',
      },
    },
  },
};
</script>

<template>
  <div style="position: relative; height: 260px;">
    <VueBarChart :data="chartData" :options="chartOptions" />
  </div>
</template>