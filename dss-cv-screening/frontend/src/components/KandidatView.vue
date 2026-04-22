<script setup lang="ts">
import { ref } from 'vue';
import KandidatList from './KandidatList.vue';
import KandidatForm from './KandidatForm.vue';
import apiService from '../services/api';
import { Kandidat } from '../types';

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

const handleAddCandidate = async (data: Partial<Kandidat>) => {
  try {
    await apiService.createKandidat(data);
    showForm.value = false;
    emit('refresh');
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
  } catch (error) {
    console.error('Error updating candidate:', error);
  }
};

const handleDeleteCandidate = async (id: string) => {
  if (!confirm('Apakah Anda yakin ingin menghapus kandidat ini?')) return;
  try {
    await apiService.deleteKandidat(id);
    emit('refresh');
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
  <div>
    <div v-if="!showForm">
      <KandidatList
        :candidates="candidates"
        :loading="loading"
        @add="showForm = true"
        @edit="handleEditCandidate"
        @delete="handleDeleteCandidate"
      />
    </div>
    <div v-else>
      <KandidatForm
        :candidate="editingCandidate || undefined"
        :is-edit="!!editingCandidate"
        @submit="editingCandidate ? handleUpdateCandidate($event) : handleAddCandidate($event)"
        @cancel="handleCancelForm"
      />
    </div>
  </div>
</template>
