<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import apiService from './services/api';
import DashboardStats from './components/DashboardStats.vue';
import KandidatView from './components/KandidatView.vue';
import RankingView from './components/RankingView.vue';
import type { Kandidat, RankingResult, Bobot } from './types';

type ActiveTab = 'dashboard' | 'kandidat' | 'ranking';

const activeTab = ref<ActiveTab>('dashboard');
const candidates = ref<Kandidat[]>([]);
const rankingResults = ref<RankingResult[]>([]);
const bobots = ref<Bobot[]>([]);
const loading = ref(false);
const calculating = ref(false);
const sidebarOpen = ref(true);

onMounted(() => {
  loadKandidats();
  loadRanking();
  loadBobots();
});

const loadKandidats = async () => {
  try {
    loading.value = true;
    candidates.value = await apiService.getKandidats();
  } catch (error) {
    console.error('Error loading candidates:', error);
  } finally {
    loading.value = false;
  }
};

const loadRanking = async () => {
  try {
    rankingResults.value = await apiService.getRanking();
  } catch (error) {
    console.error('Error loading ranking:', error);
  }
};

const loadBobots = async () => {
  try {
    bobots.value = await apiService.getBobots();
  } catch (error) {
    console.error('Error loading bobots:', error);
  }
};

const handleRefresh = async () => {
  await loadKandidats();
  await loadRanking();
};

const handleCalculateRanking = async () => {
  try {
    calculating.value = true;
    await apiService.calculateRanking();
    await loadRanking();
  } catch (error) {
    console.error('Error calculating ranking:', error);
  } finally {
    calculating.value = false;
  }
};

const pageTitle = computed(() => {
  switch (activeTab.value) {
    case 'dashboard': return 'Dashboard Overview';
    case 'kandidat': return 'Manajemen Kandidat';
    case 'ranking': return 'Hasil Ranking SAW';
    default: return 'DSS CV Screening';
  }
});

const pageSubtitle = computed(() => {
  switch (activeTab.value) {
    case 'dashboard': return 'Analitik & ringkasan data kandidat';
    case 'kandidat': return 'Kelola data kandidat CV';
    case 'ranking': return 'Perankingan menggunakan metode SAW';
    default: return '';
  }
});

const navItems = [
  {
    key: 'dashboard' as ActiveTab,
    label: 'Dashboard',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>`,
  },
  {
    key: 'kandidat' as ActiveTab,
    label: 'Kandidat',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
  },
  {
    key: 'ranking' as ActiveTab,
    label: 'Ranking',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`,
  },
];
</script>

<template>
  <div class="flex h-screen bg-slate-900 overflow-hidden">

    <!-- Sidebar -->
    <aside
      :class="[
        'sidebar flex flex-col bg-slate-800 border-r border-slate-700/60 shrink-0 z-20 transition-all duration-300 ease-in-out',
        sidebarOpen ? 'w-64' : 'w-16'
      ]"
    >
      <!-- Logo -->
      <div class="flex items-center gap-3 px-4 py-5 border-b border-slate-700/60 min-h-[72px]">
        <div class="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <transition name="fade-slide">
          <div v-if="sidebarOpen" class="overflow-hidden">
            <p class="text-sm font-bold text-slate-100 whitespace-nowrap">DSS CV Screening</p>
            <p class="text-xs text-slate-500 whitespace-nowrap">SAW Method</p>
          </div>
        </transition>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-2 py-4 space-y-1">
        <p v-if="sidebarOpen" class="px-3 mb-3 text-[10px] font-semibold tracking-widest text-slate-500 uppercase">Menu Utama</p>
        <button
          v-for="item in navItems"
          :key="item.key"
          @click="activeTab = item.key"
          :class="[
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative',
            activeTab === item.key
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
          ]"
        >
          <span class="shrink-0" v-html="item.icon"></span>
          <transition name="fade-slide">
            <span v-if="sidebarOpen" class="whitespace-nowrap">{{ item.label }}</span>
          </transition>
          <!-- Active indicator -->
          <span
            v-if="activeTab === item.key"
            class="absolute right-2 w-1.5 h-1.5 rounded-full bg-emerald-400"
          ></span>
          <!-- Tooltip for collapsed -->
          <span
            v-if="!sidebarOpen"
            class="absolute left-full ml-2 px-2 py-1 text-xs font-medium text-slate-200 bg-slate-700 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-150 shadow-lg z-50"
          >{{ item.label }}</span>
        </button>
      </nav>

      <!-- Footer -->
      <div class="px-4 py-4 border-t border-slate-700/60">
        <transition name="fade-slide">
          <p v-if="sidebarOpen" class="text-[11px] text-slate-500 text-center">© 2026 DSS System</p>
        </transition>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">

      <!-- Top Navbar -->
      <header class="flex items-center justify-between px-6 bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/60 h-[72px] shrink-0">
        <div class="flex items-center gap-4">
          <!-- Toggle Sidebar -->
          <button
            @click="sidebarOpen = !sidebarOpen"
            class="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/60 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <!-- Breadcrumb -->
          <div>
            <h1 class="text-base font-bold text-slate-100 leading-tight">{{ pageTitle }}</h1>
            <p class="text-xs text-slate-500">{{ pageSubtitle }}</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <!-- Refresh button -->
          <button
            @click="handleRefresh"
            class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-emerald-400 hover:bg-slate-700/60 border border-slate-700/60 hover:border-emerald-500/30 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span class="hidden sm:inline">Refresh</span>
          </button>

          <!-- Divider -->
          <div class="h-6 w-px bg-slate-700"></div>

          <!-- User profile -->
          <div class="flex items-center gap-2.5">
            <div class="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              AD
            </div>
            <div class="hidden sm:block">
              <p class="text-xs font-semibold text-slate-200">Admin</p>
              <p class="text-[10px] text-slate-500">DSS System</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <main class="flex-1 overflow-y-auto bg-slate-900 p-6">
        <transition name="page" mode="out-in">
          <div v-if="activeTab === 'dashboard'" key="dashboard">
            <DashboardStats
              :candidates="candidates"
              :ranking-results="rankingResults"
              :bobots="bobots"
            />
          </div>
          <div v-else-if="activeTab === 'kandidat'" key="kandidat">
            <KandidatView
              :candidates="candidates"
              :loading="loading"
              @refresh="handleRefresh"
            />
          </div>
          <div v-else-if="activeTab === 'ranking'" key="ranking">
            <RankingView
              :results="rankingResults"
              :loading="loading"
              :calculating="calculating"
              @calculate="handleCalculateRanking"
            />
          </div>
        </transition>
      </main>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  position: relative;
}

/* Page transition */
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Fade slide for sidebar text */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  max-width: 0;
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  max-width: 200px;
}
</style>
