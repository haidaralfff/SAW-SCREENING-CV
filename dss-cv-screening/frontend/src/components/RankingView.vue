<script setup lang="ts">
import RankingTable from './RankingTable.vue';
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
</script>

<template>
  <RankingTable
    :results="results"
    :loading="loading"
    :calculating="calculating"
    @calculate="handleCalculate"
  />
</template>
