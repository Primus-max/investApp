<template>
  <MainLayout>
    <template #header>
      <section class="page__header">
        <Header class="page__header-nav">
          <template #left>
            <button class="page__header-cancel">Cancel</button>
          </template>
          <template #right>
            <!-- <p class="section__header-nav-title">
              <span class="section__header-title">Kapitalist</span>
              <span class="section__header-subtitle">bot</span>
            </p> -->
          </template>
        </Header>
        <div class="page__header-stats-row">
          <div class="page__header-stats-main">
            <div class="page__header-stats-info">
              <span class="page__header-stats-title">Общий капитал</span>
              <div class="page__header-stats-value-row">
                <span class="page__header-stats-value"> {{  isNotData ? '0' : '267 981' }}</span>
                <span class="page__header-stats-currency">₽</span>
              </div>
            </div>
            <div class="page__header-stats-icon">
              <div class="page__header-bell-bg">
                <Notification02 />
              </div>
            </div>
          </div>
          <div v-if="!isNotData" class="page__header-badge-row">
            <span class="page__header-badge">+ 27 861,33 ₽ <span class="page__header-badge-percent">(18,44%)</span></span>
            <span class="page__header-badge-period">за все время</span>
          </div>
        </div>
      </section>
    </template>

    <section class="page__body">
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
          Мои портфели
        </h2>
        <ul class="page__body-portfolio-list">
          <PortfolioCard 
            v-for="portfolio in portfolios" 
            :key="portfolio.id" 
            :portfolio="portfolio" 
          />
        </ul>
      </section>
      <div v-else class="page__body-portfolio-empty">
        <AppPillButton>          
          <template #default>
            <div class="page__body-portfolio-empty-button">
              <IconBriefcase01 class="page__body-portfolio-empty-button-icon" />
              <span class="page__body-portfolio-empty-button-label">Добавить портфель</span>
            </div>            
          </template>         
        </AppPillButton>
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue';

import AppBanner from '@/components/atoms/AppBanner.vue';
import AppPillButton from '@/components/atoms/AppPillButton.vue';
import BadgeAtom from '@/components/atoms/BadgeAtom.vue';
import Edit01 from '@/components/atoms/icons/Edit-01.vue';
import IconBriefcase01 from '@/components/atoms/icons/IconBriefcase01.vue';
import IconPlusSignSquare
  from '@/components/atoms/icons/IconPlusSignSquare.vue';
import Notification02 from '@/components/atoms/icons/Notification-02.vue';
import PlusButtonAtom from '@/components/atoms/PlusButtonAtom.vue';
import PortfolioCard from '@/components/molecules/PortfolioCard.vue';
import StatWidgetCard
  from '@/components/molecules/stat-widgets/StatWidgetCard.vue';
import Header from '@/components/organisms/Header.vue';
import MainLayout from '@/layout/MainLayout.vue';
import { usePortfoliosStore } from '@/stores/portfolios.js';

const amount = ref(27861.33);
const totalAmount = ref(123456789);
const editMode = ref(false);
const isNotData = ref(false);

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

const store = usePortfoliosStore();
const portfolios = store.getAllPortfolios().map(p => ({
  ...p,
  amount: p.totalAmount,
  profit: p.totalProfit,
  percent: p.totalPercent,
  icons: Array.isArray(p.assets) ? p.assets.map(a => a.logo) : [],
}));
</script>

<style lang="scss" scoped>
@import '@/styles/_sections.scss';
</style>