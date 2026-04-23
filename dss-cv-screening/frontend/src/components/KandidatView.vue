<script setup lang="ts">
import { ref } from 'vue';
import KandidatList from './KandidatList.vue';
import KandidatForm from './KandidatForm.vue';
import apiService from '../services/api';
import type { Kandidat } from '../types';

interface Props {
  candidates: Kandidat[];
  loading?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  refresh: [];
}>();

const showForm = ref(false);
const editingCandidate = ref<Kandidat | null>(null);
const successMessage = ref('');

const showSuccess = (msg: string) => {
  successMessage.value = msg;
  setTimeout(() => (successMessage.value = ''), 3500);
};

const handleAddCandidate = async (data: Partial<Kandidat>) => {
  try {
    await apiService.createKandidat(data);
    showForm.value = false;
    emit('refresh');
    showSuccess('Kandidat berhasil ditambahkan!');
  } catch (error) {
    console.error('Error adding candidate:', error);
  }
};

const handleUpdateCandidate = async (data: Partial<Kandidat>) => {
  if (!editingCandidate.value) return;
  try {
    await apiService.updateKandidat(editingCandidate.value.id, data);
    showForm.value = false;
    editingCandidate.value = null;
    emit('refresh');
    showSuccess('Data kandidat berhasil diperbarui!');
  } catch (error) {
    console.error('Error updating candidate:', error);
  }
};

const handleDeleteCandidate = async (id: string) => {
  if (!confirm('Apakah Anda yakin ingin menghapus kandidat ini?')) return;
  try {
    await apiService.deleteKandidat(id);
    emit('refresh');
    showSuccess('Kandidat berhasil dihapus.');
  } catch (error) {
    console.error('Error deleting candidate:', error);
  }
};

const handleEditCandidate = (candidate: Kandidat) => {
  editingCandidate.value = candidate;
  showForm.value = true;
};

const handleCancelForm = () => {
  showForm.value = false;
  editingCandidate.value = null;
};
</script>

<template>
  <div class="space-y-4">
    <!-- Success Alert -->
    <transition name="alert">
      <div
        v-if="successMessage"
        class="flex items-center gap-3 px-4 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ successMessage }}
      </div>
    </transition>

    <transition name="page" mode="out-in">
      <KandidatList
        v-if="!showForm"
        key="list"
        :candidates="candidates"
        :loading="loading"
        @add="showForm = true"
        @edit="handleEditCandidate"
        @delete="handleDeleteCandidate"
      />
      <KandidatForm
        v-else
        key="form"
        :candidate="editingCandidate || undefined"
        :is-edit="!!editingCandidate"
        @submit="editingCandidate ? handleUpdateCandidate($event) : handleAddCandidate($event)"
        @cancel="handleCancelForm"
      />
    </transition>
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.alert-enter-active,
.alert-leave-active {
  transition: all 0.3s ease;
}
.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
