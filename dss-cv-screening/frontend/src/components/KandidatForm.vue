<template>
  <div class="max-w-3xl mx-auto">
    <div class="bg-slate-800 rounded-xl border border-slate-700/60 p-6 shadow-lg">
      <!-- Header -->
      <div class="flex items-center gap-3 mb-6">
        <div class="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" v-if="!isEdit" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" v-else />
          </svg>
        </div>
        <div>
          <h2 class="text-base font-bold text-slate-100">
            {{ isEdit ? 'Edit Data Kandidat' : 'Tambah Kandidat Baru' }}
          </h2>
          <p class="text-xs text-slate-500">{{ isEdit ? 'Perbarui informasi kandidat' : 'Isi formulir data kandidat baru' }}</p>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <!-- Row 1: Nama + Email -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="form-group">
            <label class="form-label">Nama Lengkap <span class="text-red-400">*</span></label>
            <input
              v-model="form.nama"
              type="text"
              required
              placeholder="Masukkan nama lengkap"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Email <span class="text-red-400">*</span></label>
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="nama@email.com"
              class="form-input"
            />
          </div>
        </div>

        <!-- Row 2: Telepon + Posisi -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="form-group">
            <label class="form-label">Nomor Telepon</label>
            <input
              v-model="form.nomor_telepon"
              type="tel"
              placeholder="08xxxxxxxxxx"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Posisi yang Dicari <span class="text-red-400">*</span></label>
            <select v-model="form.posisi_yang_dicari" required class="form-input">
              <option value="">Pilih Posisi</option>
              <option value="Accountant">Accountant</option>
              <option value="Finance Staff">Finance Staff</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t border-slate-700/60 pt-4">
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Kriteria Penilaian (0–100)</p>
          <div class="grid grid-cols-2 gap-4">
            <div class="form-group">
              <label class="form-label">Pendidikan</label>
              <input
                v-model.number="form.pendidikan"
                type="number"
                min="0"
                max="100"
                placeholder="0"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label class="form-label">Pengalaman</label>
              <input
                v-model.number="form.pengalaman"
                type="number"
                min="0"
                max="100"
                placeholder="0"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label class="form-label">Skill Analisis</label>
              <input
                v-model.number="form.skill_analisis"
                type="number"
                min="0"
                max="100"
                placeholder="0"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label class="form-label">Sertifikasi</label>
              <input
                v-model.number="form.sertifikasi"
                type="number"
                min="0"
                max="100"
                placeholder="0"
                class="form-input"
              />
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-3 pt-2">
          <button type="submit" class="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" v-if="isEdit" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" v-else />
            </svg>
            {{ isEdit ? 'Simpan Perubahan' : 'Tambah Kandidat' }}
          </button>
          <button type="button" @click="$emit('cancel')" class="btn-secondary">
            Batal
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Kandidat } from '../types';

interface Props {
  candidate?: Kandidat;
  isEdit?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isEdit: false,
});

const emit = defineEmits<{
  submit: [data: Partial<Kandidat>];
  cancel: [];
}>();

const form = ref<Partial<Kandidat>>({
  nama: '',
  email: '',
  nomor_telepon: '',
  posisi_yang_dicari: '',
  pendidikan: 0,
  pengalaman: 0,
  skill_analisis: 0,
  sertifikasi: 0,
});

watch(
  () => props.candidate,
  (candidate) => {
    if (candidate) {
      form.value = { ...candidate };
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  emit('submit', form.value);
};
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.form-input {
  padding: 10px 12px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #e2e8f0;
  font-size: 14px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  font-family: inherit;
  width: 100%;
}

.form-input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.08);
}

.form-input::placeholder {
  color: #475569;
}

.form-input option {
  background: #1e293b;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #059669;
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.25);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  padding: 10px 20px;
  background: transparent;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #94a3b8;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: #334155;
  color: #e2e8f0;
}
</style>
