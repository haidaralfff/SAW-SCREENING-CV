<script setup lang="ts">
import { computed } from 'vue';
import { DoughnutChart as VueDoughnutChart } from 'vue-chartjs';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bobot } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  bobots: Bobot[];
}

const props = defineProps<Props>();

const chartData = computed(() => {
  const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
  const data = props.bobots.length > 0 
    ? props.bobots 
    : [
        { id: '1', nama_kriteria: 'Pendidikan', bobot: 0.25, jenis_kriteria: 'benefit' },
        { id: '2', nama_kriteria: 'Pengalaman', bobot: 0.25, jenis_kriteria: 'benefit' },
        { id: '3', nama_kriteria: 'Skill Analisis', bobot: 0.25, jenis_kriteria: 'benefit' },
        { id: '4', nama_kriteria: 'Sertifikasi', bobot: 0.25, jenis_kriteria: 'benefit' },
      ];

  return {
    labels: data.map(b => b.nama_kriteria),
    datasets: [
      {
        data: data.map(b => (b.bobot * 100).toFixed(2)),
        backgroundColor: colors.slice(0, data.length),
        borderColor: '#1e293b',
        borderWidth: 2,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: '#94a3b8',
        padding: 16,
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(30, 41, 59, 0.95)',
      padding: 12,
      borderColor: '#475569',
      borderWidth: 1,
      titleColor: '#f1f5f9',
      bodyColor: '#cbd5e1',
      callbacks: {
        label: (context: any) => `${context.parsed}%`,
      },
    },
  },
};
</script>

<template>
  <div class="chart-container">
    <VueDoughnutChart :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
