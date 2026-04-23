<script setup lang="ts">
import { computed } from 'vue';
import { Doughnut as VueDoughnutChart } from 'vue-chartjs';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import type { Bobot } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  bobots: Bobot[];
}

const props = defineProps<Props>();

const displayData = computed(() => {
  return props.bobots.length > 0
    ? props.bobots
    : [
        { id: '1', nama_kriteria: 'Pendidikan', bobot: 0.25, jenis_kriteria: 'benefit' },
        { id: '2', nama_kriteria: 'Pengalaman', bobot: 0.25, jenis_kriteria: 'benefit' },
        { id: '3', nama_kriteria: 'Skill Analisis', bobot: 0.25, jenis_kriteria: 'benefit' },
        { id: '4', nama_kriteria: 'Sertifikasi', bobot: 0.25, jenis_kriteria: 'benefit' },
      ];
});

const palette = ['#10b981', '#3b82f6', '#64748b', '#0ea5e9'];

const chartData = computed(() => ({
  labels: displayData.value.map(b => b.nama_kriteria),
  datasets: [
    {
      data: displayData.value.map(b => parseFloat((b.bobot * 100).toFixed(2))),
      backgroundColor: palette.slice(0, displayData.value.length),
      borderColor: '#0f172a',
      borderWidth: 3,
      hoverBorderColor: '#1e293b',
      hoverOffset: 6,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '68%',
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: '#94a3b8',
        padding: 14,
        font: { size: 11 },
        boxWidth: 10,
        boxHeight: 10,
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    tooltip: {
      backgroundColor: '#1e293b',
      padding: 10,
      borderColor: '#334155',
      borderWidth: 1,
      titleColor: '#f1f5f9',
      bodyColor: '#94a3b8',
      displayColors: true,
      callbacks: {
        label: (context: any) => `  ${context.parsed.toFixed(1)}%`,
      },
    },
  },
};
</script>

<template>
  <div style="position: relative; height: 240px;">
    <VueDoughnutChart :data="chartData" :options="chartOptions" />
  </div>
</template>
