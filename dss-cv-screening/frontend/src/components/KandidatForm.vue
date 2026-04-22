<template>
  <div class="max-w-2xl mx-auto">
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-slate-100">
          {{ isEdit ? '✏️ Edit Kandidat' : '➕ Tambah Kandidat Baru' }}
        </h2>
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Name -->
        <div class="form-group">
          <label class="form-label">Nama Lengkap</label>
          <input
            v-model="form.nama"
            type="text"
            required
            placeholder="Masukkan nama lengkap"
            class="form-input"
          />
        </div>

        <!-- Email -->
        <div class="form-group">
          <label class="form-label">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            placeholder="Masukkan email"
            class="form-input"
          />
        </div>

        <!-- Phone -->
        <div class="form-group">
          <label class="form-label">Nomor Telepon</label>
          <input
            v-model="form.nomor_telepon"
            type="tel"
            placeholder="Masukkan nomor telepon"
            class="form-input"
          />
        </div>

        <!-- Position -->
        <div class="form-group">
          <label class="form-label">Posisi yang Dicari</label>
          <select v-model="form.posisi_yang_dicari" required class="form-input">
            <option value="">Pilih Posisi</option>
            <option value="Accountant">Accountant</option>
            <option value="Finance Staff">Finance Staff</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        <!-- Criteria Grid -->
        <div class="grid grid-cols-2 gap-4">
          <div class="form-group">
            <label class="form-label">Pendidikan (0-100)</label>
            <input
              v-model.number="form.pendidikan"
              type="number"
              min="0"
              max="100"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Pengalaman (0-100)</label>
            <input
              v-model.number="form.pengalaman"
              type="number"
              min="0"
              max="100"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Skill Analisis (0-100)</label>
            <input
              v-model.number="form.skill_analisis"
              type="number"
              min="0"
              max="100"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Sertifikasi (0-100)</label>
            <input
              v-model.number="form.sertifikasi"
              type="number"
              min="0"
              max="100"
              class="form-input"
            />
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-3 pt-4">
          <button type="submit" class="btn-primary">
            {{ isEdit ? '💾 Update' : '➕ Tambah' }}
          </button>
          <button type="button" @click="$emit('cancel')" class="btn-secondary">
            ❌ Batal
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Kandidat } from '../types';

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
  }
);

const handleSubmit = () => {
  emit('submit', form.value);
};
</script>

<style scoped>
.card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 13px;
  font-weight: 600;
  color: #cbd5e1;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-input {
  padding: 12px 14px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #e2e8f0;
  font-size: 14px;
  transition: all 0.2s ease;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  background: #1e293b;
}

.form-input::placeholder {
  color: #64748b;
}

.btn-primary,
.btn-secondary {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.btn-primary {
  background: #10b981;
  color: white;
}

.btn-primary:hover {
  background: #059669;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-secondary {
  background: #334155;
  color: #cbd5e1;
}

.btn-secondary:hover {
  background: #475569;
  color: #e2e8f0;
}
</style>
