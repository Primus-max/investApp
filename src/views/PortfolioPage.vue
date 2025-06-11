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
              <span class="page__header-stats-title">
                {{ portfolio?.name || '—' }}
                <Edit01 class="page__header-edit" style="margin-left: 6px; cursor: pointer; vertical-align: middle;" />
              </span>
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
          <div v-if="!isNotData && hasProfit" class="page__header-badge-row">
            <span class="page__header-badge">{{ profitSign }} {{ formattedProfit }} ₽ <span class="page__header-badge-percent">({{ formattedPercent }}%)</span></span>
            <span class="page__header-badge-period">за все время</span>
          </div>
        </div>
      </section>
    </template>

    <section class="page__body">
      <div class="page__body-header">
        <h1 class="page__body-header-title">Виджеты</h1>
        <div class="page__body-header-actions">
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
          :type="idx === 2 ? 'rect' : 'square'" :editMode="editMode" />
      </div>
      <AppBanner class="page__app-banner">
        Умные советы и инструменты для роста
      </AppBanner>
      <section v-if="!isNotData" class="page__body-portfolio">
        <h2 class="page__body-portfolio-title">
          Мои портфели
        </h2>
        <ul class="page__body-portfolio-list">
          <PortfolioCard v-for="portfolio in portfolios" :key="portfolio.id" :portfolio="portfolio" />
        </ul>
      </section>
      <div v-else class="page__body-portfolio-empty">
        <AppPillButton>
          <template #icon>
            <IconBriefcase01 />
          </template>
          Добавить портфель
        </AppPillButton>
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePortfoliosStore } from '@/stores/portfolios.js';
import MainLayout from '@/layout/MainLayout.vue';
import IconArrowLeft from '@/components/atoms/icons/IconArrowLeft.vue';
import IconSettings from '@/components/atoms/icons/IconSettings.vue';
import Edit01 from '@/components/atoms/icons/Edit-01.vue';

const route = useRoute();
const router = useRouter();
const store = usePortfoliosStore();

const portfolio = ref(null);
const isLoading = ref(true);
const isNotData = ref(false);

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

function goBack() {
  router.back();
}
</script>

<style scoped lang="scss">
@import '@/styles/_sections.scss';

.page__back {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #fff;
  font-size: 17px;
  font-family: 'SF Pro', Arial, sans-serif;
  font-weight: 400;
  padding: 0 16px;
  height: 56px;
  cursor: pointer;
  outline: none;
  box-shadow: none;
  transition: background 0.15s;

  &:hover {
    background: rgba(255,255,255,0.04);
  }
}
.page__back-icon {  
  font-size: 22px;
  margin-right: 3px;
  display: flex;
  align-items: center;
  font-weight: 590;
}
.page__back-text {
  font-size: 17px;
  font-family: 'SF Pro', Arial, sans-serif;
  font-weight: 400;
  letter-spacing: -0.4px;
}
</style>