<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import apiService from './services/api';
import DashboardStats from './components/DashboardStats.vue';
import KandidatView from './components/KandidatView.vue';
import RankingView from './components/RankingView.vue';
import { Kandidat, RankingResult, Bobot } from './types';

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
    case 'dashboard':
      return 'Dashboard';
    case 'kandidat':
      return 'Manajemen Kandidat';
    case 'ranking':
      return 'Hasil Ranking';
    default:
      return 'DSS CV Screening';
  }
});
</script>

<template>
  <div class="flex h-screen bg-slate-900">
    <!-- Sidebar -->
    <div :class="['sidebar', { 'sidebar-open': sidebarOpen }]">
      <div class="p-6 border-b border-slate-700">
        <h1 class="text-2xl font-bold text-emerald-500">DSS</h1>
        <p class="text-xs text-slate-400 mt-1">CV Screening System</p>
      </div>

      <nav class="flex-1 p-6">
        <div class="space-y-2">
          <button
            @click="activeTab = 'dashboard'"
            :class="['nav-item', { active: activeTab === 'dashboard' }]"
          >
            <span class="icon">📊</span>
            <span>Dashboard</span>
          </button>
          <button
            @click="activeTab = 'kandidat'"
            :class="['nav-item', { active: activeTab === 'kandidat' }]"
          >
            <span class="icon">👥</span>
            <span>Kandidat</span>
          </button>
          <button
            @click="activeTab = 'ranking'"
            :class="['nav-item', { active: activeTab === 'ranking' }]"
          >
            <span class="icon">🏆</span>
            <span>Ranking</span>
          </button>
        </div>
      </nav>

      <div class="p-6 border-t border-slate-700">
        <p class="text-xs text-slate-400">© 2026 DSS System</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Top Navbar -->
      <div class="navbar">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button
              @click="sidebarOpen = !sidebarOpen"
              class="text-slate-400 hover:text-emerald-500 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 class="text-xl font-bold text-slate-100">{{ pageTitle }}</h2>
          </div>
          <div class="flex items-center gap-4">
            <button
              @click="handleRefresh"
              class="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 text-sm font-medium transition-colors"
            >
              🔄 Refresh
            </button>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="flex-1 overflow-auto p-6">
        <div v-show="activeTab === 'dashboard'" class="fade-in">
          <DashboardStats
            :candidates="candidates"
            :ranking-results="rankingResults"
            :bobots="bobots"
          />
        </div>

        <div v-show="activeTab === 'kandidat'" class="fade-in">
          <KandidatView
            :candidates="candidates"
            :loading="loading"
            @refresh="handleRefresh"
          />
        </div>

        <div v-show="activeTab === 'ranking'" class="fade-in">
          <RankingView
            :results="rankingResults"
            :loading="loading"
            :calculating="calculating"
            @calculate="handleCalculateRanking"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 280px;
  background: #1e293b;
  border-right: 1px solid #334155;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  z-index: 100;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    transform: translateX(-100%);
  }

  .sidebar.sidebar-open {
    transform: translateX(0);
  }
}

.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  text-align: left;
}

.nav-item:hover {
  background: #334155;
  color: #10b981;
}

.nav-item.active {
  background: #334155;
  color: #10b981;
  border-left: 3px solid #10b981;
  padding-left: 13px;
}

.icon {
  font-size: 18px;
}

.navbar {
  background: #1e293b;
  border-bottom: 1px solid #334155;
  padding: 16px 24px;
  height: 70px;
  display: flex;
  align-items: center;
}

.fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

