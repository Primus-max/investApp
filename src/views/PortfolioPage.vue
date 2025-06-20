<template>
  <MainLayout>
    <template #header>
      <section class="page__header">
        <button class="page__back" @click="goBack">
          <IconArrowLeft class="page__back-icon" />
          <span class="page__back-text">Back</span>
        </button>
        <div class="page__header-stats-row">
          <div class="page__header-stats-main">
            <div class="page__header-stats-info">
              <div class="page__header-stats-title">
                <input v-if="isEditingName" v-model="editedName" @blur="saveNameEdit" @keyup.enter="saveNameEdit"
                  @keyup.escape="cancelNameEdit" class="page__header-edit-input" ref="nameInput" />
                <span v-else>{{ portfolio?.name || '—' }}</span>
                <Edit01 :color="'#fff'" class="page__header-edit" @click="startNameEdit" />
              </div>
              <div class="page__header-stats-value-row">
                <span class="page__header-stats-value">{{ isNotData ? '0' : formattedAmount }}</span>
                <!-- <span class="page__header-stats-currency">₽</span> -->
              </div>
            </div>
            <div class="page__header-stats-icon">
              <div class="page__header-bell-bg">
                <IconSettings />
              </div>
            </div>
          </div>
          <div class="page__header-badge-container">
            <div v-if="!isNotData && hasProfit" class="page__header-badge-row">
              <span class="page__header-badge">{{ profitSign }} {{ formattedProfit }} ₽ <span
                  class="page__header-badge-percent">({{ formattedPercent }}%)</span></span>
              <span class="page__header-badge-period">за все время</span>
            </div>
          </div>
          <div class="page__header-progress">
            <ProgressBar :progress="portfolioProgress" size="thin" color="primary" />
          </div>
        </div>
      </section>
    </template>

    <section class="page__body">
      <div class="page__body-header-stats-buttons">
        <AppPillButton class="page__body-header-stats-button" @click="goToOperations">
          <template #default>
            <div class="page__body-header-stats-button-content">
              <IconClock01 class="page__body-header-stats-button-icon" />
              <span class="page__body-header-stats-button-label">Операции</span>
            </div>
          </template>
        </AppPillButton>
        <AppPillButton class="page__body-header-stats-button" @click="goToAnalytics">
          <template #default>
            <div class="page__body-header-stats-button-content">
              <IconChartRing class="page__body-header-stats-button-icon" />
              <span class="page__body-header-stats-button-label">Аналитика</span>
            </div>
          </template>
        </AppPillButton>
      </div>
      <div class="page__body-header">
        <h1 class="page__body-header-title">Виджеты</h1>
        <div class="page__body-header-edit-mode">
          <template v-if="!editMode">
            <button class="page__body-header-button" @click="editMode = true">
              <Edit01 class="page__body-header-button-icon" />
            </button>
          </template>
          <template v-else>
            <PlusButtonAtom />
            <button class="page__body-header-done" @click="editMode = false">
              Готов
            </button>
          </template>
        </div>
      </div>
      <div class="page__widgets-grid">
        <StatWidgetCard v-for="(widget, idx) in widgets" :key="idx" :title="widget.title" :value="widget.value"
          :percent="widget.trend.value" :positive="widget.trend.positive" :chart-data="widget.chartData"
          :type="idx === 2 ? 'rect' : 'square'" :editMode="editMode" :is-not-data="isNotData" />
      </div>
      <AppBanner class="page__app-banner">
        Умные советы и инструменты для роста
      </AppBanner>
      <section v-if="!isNotData" class="page__body-portfolio">
        <h2 class="page__body-portfolio-title">
          Мои активы
        </h2>
        <div class="page__body-portfolio-list page__body-portfolio-list--unified">
          <PortfolioAssetCard v-for="asset in assets" :key="asset.bank" :asset="asset" />
        </div>
      </section>
      <div v-else class="page__body-portfolio-empty">
        <AppPillButton @click="uiStore.openAddOperationModal()">          
          <template #default>
            <div class="page__body-portfolio-empty-button">
              <IconCoinsSwap class="page__body-portfolio-empty-button-icon" />
              <span class="page__body-portfolio-empty-button-label">Создать сделку</span>
            </div>            
          </template>         
        </AppPillButton>
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import {
  computed,
  nextTick,
  onMounted,
  ref,
} from 'vue';

import {
  useRoute,
  useRouter,
} from 'vue-router';

import AppBanner from '@/components/atoms/AppBanner.vue';
import AppPillButton from '@/components/atoms/AppPillButton.vue';
import Edit01 from '@/components/atoms/icons/Edit-01.vue';
import IconArrowLeft from '@/components/atoms/icons/IconArrowLeft.vue';
import IconBriefcase01 from '@/components/atoms/icons/IconBriefcase01.vue';
import IconChartRing from '@/components/atoms/icons/IconChartRing.vue';
import IconClock01 from '@/components/atoms/icons/IconClock01.vue';
import IconCoinsSwap from '@/components/atoms/icons/IconCoinsSwap.vue';
import IconSettings from '@/components/atoms/icons/IconSettings.vue';
import PlusButtonAtom from '@/components/atoms/PlusButtonAtom.vue';
import ProgressBar from '@/components/atoms/ProgressBar.vue';
import PortfolioAssetCard from '@/components/molecules/PortfolioAssetCard.vue';
import StatWidgetCard
  from '@/components/molecules/stat-widgets/StatWidgetCard.vue';
import MainLayout from '@/layout/MainLayout.vue';
import { usePortfoliosStore } from '@/stores/portfolios.js';
import { useUiStore } from '@/stores/ui.js';

const route = useRoute();
const router = useRouter();
const store = usePortfoliosStore();
const uiStore = useUiStore();

const portfolio = ref(null);
const isLoading = ref(true);
const isNotData = ref(false);
const editMode = ref(false);
const isEditingName = ref(false);
const editedName = ref('');
const nameInput = ref(null);

onMounted(async () => {
  const id = route.params.id;
  const p = await store.fetchPortfolioById(id);
  if (!p) {
    isNotData.value = true;
    isLoading.value = false;
    return;
  }
  portfolio.value = {
    ...p,
    amount: p.totalAmount,
    profit: p.totalProfit,
    percent: p.totalPercent,
    icons: Array.isArray(p.assets) ? p.assets.map(a => a.logo) : [],
  };
  isLoading.value = false;
});

const formattedAmount = computed(() => {
  if (!portfolio.value) return '0';
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 2
  }).format(portfolio.value.amount);
});

const hasProfit = computed(() =>
  portfolio.value && typeof portfolio.value.profit === 'number' && typeof portfolio.value.percent === 'number'
);

const formattedProfit = computed(() => {
  if (!hasProfit.value) return '';
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Math.abs(portfolio.value.profit));
});

const formattedPercent = computed(() => {
  if (!hasProfit.value) return '';
  return Math.abs(portfolio.value.percent).toFixed(2);
});

const profitSign = computed(() => {
  if (!hasProfit.value) return '';
  return portfolio.value.profit >= 0 ? '+' : '-';
});

const assets = computed(() => {
  if (!portfolio.value || !portfolio.value.assets) return [];
  return portfolio.value.assets;
});

const portfolioProgress = computed(() => {
  // Примерный расчет прогресса на основе прибыли (можно настроить под вашу логику)
  if (!hasProfit.value) return 0;
  return Math.min(100, Math.max(0, portfolio.value.percent + 50)); // +50 чтобы сделать более реалистичным
});

function goBack() {
  router.back();
}

function goToAnalytics() {
  const portfolioId = route.params.id;
  router.push(`/analytics/${portfolioId}`);
}

function goToOperations() {
  router.push('/operations');
}

function startNameEdit() {
  if (!portfolio.value) return;
  editedName.value = portfolio.value.name;
  isEditingName.value = true;
  // Фокус на input после следующего тика
  nextTick(() => {
    if (nameInput.value) {
      nameInput.value.focus();
      nameInput.value.select();
    }
  });
}

function saveNameEdit() {
  if (!editedName.value.trim()) {
    cancelNameEdit();
    return;
  }
  if (portfolio.value) {
    portfolio.value.name = editedName.value.trim();
  }
  isEditingName.value = false;
}

function cancelNameEdit() {
  isEditingName.value = false;
  editedName.value = '';
}

const widgets = [
  {
    title: 'Прибыль',
    value: 67981,
    currency: '₽',
    trend: { value: 12, positive: true },
    chartData: [20, 22, 28, 25, 28, 12, 30, 32, 33, 38, 42, 40, 45, 22, 23, 21, 42, 26, 25, 40],
    color: 'green',
  },
  {
    title: 'Доходность',
    value: 67981,
    currency: '₽',
    trend: { value: 8, positive: false },
    chartData: [34, 32, 38, 35, 32, 30, 28, 25, 22, 20, 18, 15, 12, 10, 8, 5, 2, 0, -2, -5],
    color: 'red',
  },
  {
    title: 'Стоимость капитала',
    value: 67981,
    currency: '₽',
    trend: { value: 24, positive: true },
    chartData: [40, 42, 45, 43, 48, 52, 50, 55, 58, 62, 60, 65, 68, 72, 70, 75, 78, 82, 85, 88],
    color: 'green',
  },
];

</script>

<style scoped lang="scss">
@import '@/styles/_sections.scss';

.page {
  &__body-header-stats-button {
    width: 168px;
    height: 64px;
  }
}

.page__header {
  height: 330px;
}


// .page__back {
//   display: flex;
//   align-items: center;
//   background: none;
//   border: none;
//   color: #fff;
//   font-size: 17px;
//   font-family: 'SF Pro', Arial, sans-serif;
//   font-weight: 400;
//   padding: 0 16px;
//   height: 56px;
//   cursor: pointer;
//   outline: none;
//   box-shadow: none;
//   transition: background 0.15s;

//   // &:hover {
//   //   background: rgba(255, 255, 255, 0.04);
//   // }
// }

// .page__back-icon {
//   font-size: 22px;
//   margin-right: 3px;
//   display: flex;
//   align-items: center;
//   font-weight: 590;
// }

// .page__back-text {
//   font-size: 17px;
//   font-family: 'SF Pro', Arial, sans-serif;
//   font-weight: 400;
//   letter-spacing: -0.4px;
// }



.page__header-edit-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: #fff;
  font-family: $font-main;
  font-size: 18px;
  font-weight: 600;
  padding: 4px 8px;
  outline: none;

  &:focus {
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
}

.page__header-badge-container {
  height: 48px; // Фиксированная высота всегда резервирует место
  display: flex;
  align-items: center;
}

.page__header-progress {
  width: 100%;
  margin-top: 16px; 
}
</style>