<script setup lang="ts">
import { ref } from 'vue';
import apiService from '../services/api';

const emit = defineEmits(['login-success']);

const username = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');
const isRegistering = ref(false);

const handleSubmit = async () => {
  if (!username.value || !password.value) {
    error.value = 'Username dan password wajib diisi';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    if (isRegistering.value) {
      await apiService.register(username.value, password.value);
      isRegistering.value = false;
      error.value = 'Registrasi berhasil, silakan login';
    } else {
      await apiService.login(username.value, password.value);
      emit('login-success');
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Terjadi kesalahan pada server';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-900 p-4">
    <div class="w-full max-w-md bg-slate-800 rounded-2xl border border-slate-700/60 shadow-2xl overflow-hidden">
      <!-- Header -->
      <div class="p-8 text-center bg-slate-800/50 border-b border-slate-700/60">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-white mb-2">{{ isRegistering ? 'Buat Akun Baru' : 'Login Dashboard' }}</h1>
        <p class="text-slate-400 text-sm">Sistem Pendukung Keputusan CV Screening</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-8 space-y-6">
        <div v-if="error" :class="['p-4 rounded-xl text-sm border', error.includes('berhasil') ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400']">
          {{ error }}
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-300">Username</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </span>
            <input
              v-model="username"
              type="text"
              class="w-full bg-slate-900 border border-slate-700/60 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
              placeholder="Masukkan username"
              required
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-300">Password</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </span>
            <input
              v-model="password"
              type="password"
              class="w-full bg-slate-900 border border-slate-700/60 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
              placeholder="Masukkan password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          {{ loading ? 'Memproses...' : (isRegistering ? 'Daftar Sekarang' : 'Login') }}
        </button>

        <div class="text-center">
          <button
            type="button"
            @click="isRegistering = !isRegistering; error = ''"
            class="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
          >
            {{ isRegistering ? 'Sudah punya akun? Login' : 'Belum punya akun? Registrasi' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
