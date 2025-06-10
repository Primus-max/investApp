<template>
  <MainLayout>
    <template #header>
      <div class="mainpage__header">
        <Header class="mainpage__header-nav">
          <template #left>
            <button class="mainpage__header-cancel">Cancel</button>
          </template>
          <template #right>
            <p class="mainpage__header-nav-title">
              <span class="mainpage__header-title">Kapitalist</span>
              <span class="mainpage__header-subtitle">bot</span>
            </p>
          </template>
        </Header>
        <div class="mainpage__header-stats-row">
          <div class="mainpage__header-stats-info">
            <span class="mainpage__header-stats-title">Общий капитал</span>
            <div class="mainpage__header-stats-value-row">
              <span class="mainpage__header-stats-value">267 981</span>
              <span class="mainpage__header-stats-currency">₽</span>
            </div>
            <div class="mainpage__header-badge-row">
              <span class="mainpage__header-badge">+ 27 861,33 ₽ <span
                  class="mainpage__header-badge-percent">(18,44%)</span></span>
              <span class="mainpage__header-badge-period">за все время</span>
            </div>
          </div>
          <div class="mainpage__header-stats-icon">
            <div class="mainpage__header-bell-bg">
              <Notification02 />
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="mainpage__body">
      <div class="mainpage__body-header">
        <h1 class="mainpage__body-header-title">Виджеты</h1>
        <button class="mainpage__body-header-button">
          <Edit01 class="mainpage__body-header-button-icon" />
        </button>
      </div>

      <div class="mainpage__widgets-grid">
        <StatWidgetCard v-for="(widget, idx) in widgets" :key="idx" :title="widget.title" :value="widget.value"
          :percent="widget.trend.value" :positive="widget.trend.positive" :chart-data="widget.chartData"
          :type="idx === 2 ? 'rect' : 'square'" />
      </div>

      <AppBanner class="mainpage__app-banner">
        Умные советы и инструменты для роста
      </AppBanner>

      <section class="mainpage__body-portfolio">
        <h2 class="mainpage__body-portfolio-title">
          Мои портфели
        </h2>

        <ul class="mainpage__body-portfolio-list">
          <PortfolioCard 
            v-for="portfolio in portfolios" 
            :key="portfolio.id" 
            :portfolio="portfolio" 
          />
        </ul>
      </section>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue';

import AppBanner from '@/components/atoms/AppBanner.vue';
import BadgeAtom from '@/components/atoms/BadgeAtom.vue';
import Edit01 from '@/components/atoms/icons/Edit-01.vue';
import Notification02 from '@/components/atoms/icons/Notification-02.vue';
import PortfolioCard from '@/components/molecules/PortfolioCard.vue';
import StatWidgetCard
  from '@/components/molecules/stat-widgets/StatWidgetCard.vue';
import Header from '@/components/organisms/Header.vue';
import MainLayout from '@/layout/MainLayout.vue';

const amount = ref(27861.33);
const totalAmount = ref(123456789);

const widgets = [
  {
    title: 'Прибыль',
    value: 67981,
    currency: '₽',
    trend: { value: 12, positive: true },
    chartData: [50, 52, 48, 55, 58, 54, 60, 65, 63, 68, 72, 70, 75, 78, 82, 80, 85, 88, 92, 95],
    color: 'green',
  },
  {
    title: 'Доходность',
    value: 67981,
    currency: '₽',
    trend: { value: 8, positive: false },
    chartData: [95, 92, 88, 85, 82, 78, 75, 72, 68, 65, 62, 58, 55, 52, 48, 45, 42, 38, 35, 32],
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

const portfolios = ref([
  {
    id: 1,
    name: 'Консервативный портфель',
    bank: 'Сбербанк',
    amount: 125000,
    currency: '₽',
    profit: {
      amount: 8500,
      percent: 7.3,
      positive: true
    },
    icons: ['sber', 'rub', 'bitcoinBadge']
  },
  {
    id: 2,
    name: 'Агрессивный рост',
    bank: 'Тинькофф',
    amount: 89000,
    currency: '₽',
    profit: {
      amount: 12500,
      percent: 16.3,
      positive: true
    },
    icons: ['bitcoinBadge', 'ethereum', 'tetherBadge']
  },
  {
    id: 3,
    name: 'Валютный хедж',
    bank: 'ВТБ',
    amount: 53500,
    currency: '₽',
    profit: {
      amount: 2100,
      percent: 4.1,
      positive: false
    },
    icons: ['tetherBadge', 'chainlinkBadge', 'minaBadge', 'bitcoinBadge', 'ethereum']
  }
]);
</script>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';

.mainpage {
  width: 100%;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__header {
    width: 100%;
    height: 300px;
    color: #fff;
    display: flex;
    flex-direction: column;
    font-size: 20px;
    font-weight: $font-weight-semibold;
  }

  &__header-nav {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 64px;
  }

  &__header-cancel {
    width: 54px;
    height: 22px;
    font-family: 'SF Pro', Arial, sans-serif;
    font-style: normal;
    font-weight: $font-weight-regular;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.4px;
    color: $gray-0;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
  }

  &__header-nav-spacer {
    min-width: 60px;
    background: none;
    border: none;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    padding: 0 12px;
  }

  &__header-nav-title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-weight: 600;
    font-size: 18px;
    margin: 0;
    line-height: 1.1;
    pointer-events: none;
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    color: #181818;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    border-radius: 20px;

    &-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 90%;
      margin-top: 16px;
    }

    &-header-title {
      font-size: 20px;
      margin-bottom: 0;
      font-weight: $font-weight-semibold;
      color: $gray-950;
    }

    &-header-button {
      background: rgba(255, 255, 255, 0.9);
      border: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;

      &:hover {
        background: rgba(255, 255, 255, 1);
        transform: scale(1.05);
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }

  &__header-title {
    width: 75px;
    height: 22px;
    font-family: 'SF Pro', Arial, sans-serif;
    font-style: normal;
    font-weight: 590;
    font-size: 17px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.4px;
    color: $gray-0;
    flex: none;
    order: 0;
    flex-grow: 0;
    display: block;
  }

  &__header-subtitle {
    width: 20px;
    height: 20px;
    font-family: 'Roboto', Arial, sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.1px;
    color: #AAAAAA;
    flex: none;
    order: 1;
    flex-grow: 0;
    display: block;
  }

  &__widgets-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 16px;
    width: 100%;
    max-width: 375px;
    margin: 0 auto;
    padding: 0 16px;

    &> :nth-child(1),
    &> :nth-child(2) {
      width: 100%;
    }

    &> :nth-child(3) {
      grid-column: 1 / -1;
      width: 100%;
    }
  }

  &__widget-card {
    width: 175px;
    height: 166px;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    position: relative;
  }

  &__header-stats {
    width: 100%;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 20px 20px 24px 20px;

    position: relative;
  }

  &__header-stats-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 40px;
    padding: 0 16px;
  }

  &__header-stats-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  &__header-stats-title {
    font-family: $font-main;
    font-size: 18px;
    font-weight: 600;
    color: $gray-0;
    opacity: 1;
    margin-bottom: 0;
    letter-spacing: 0;
    line-height: 24px;
  }

  &__header-stats-value-row {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 4px;
    margin-bottom: 0;
  }

  &__header-stats-value {
    font-family: $font-main;
    font-size: 40px;
    font-weight: 600;
    color: $gray-0;
    line-height: 1.1;
    letter-spacing: 0;
    margin-bottom: 0;
  }

  &__header-stats-currency {
    font-size: 22px;
    font-weight: 600;
    margin-left: 2px;
    opacity: 1;
    color: $gray-0;
    line-height: 28px;
  }

  &__header-badge-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
  }

  &__header-badge {
    background: rgba(255, 255, 255, 0.10);
    color: $gray-0;
    font-size: 16px;
    font-weight: 400;
    border-radius: 10000px;
    padding: 6px 12px;
    margin-right: 0;
    margin-bottom: 0;
    display: inline-flex;
    align-items: center;
    backdrop-filter: blur(32px);
  }

  &__header-badge-percent {
    color: $color-success;
    font-weight: 600;
    margin-left: 4px;
  }

  &__header-badge-period {
    font-size: 16px;
    color: $gray-0;
    opacity: 0.8;
    margin-left: 0;
    font-weight: 400;
    line-height: 22px;
  }

  &__header-stats-icon {
    margin-left: 16px;
    margin-top: 4px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    width: 48px;
    height: 48px;
  }

  &__header-bell-bg {
    background: rgba(255, 255, 255, 0.10);
    border-radius: 10000px;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
  }

  &__app-banner {
    width: 90%;
    margin-top: 16px;
  }

  &__body-portfolio {
    width: 90%;
    margin-top: 24px;
  }

  &__body-portfolio-title {
    font-size: 20px;
    font-weight: $font-weight-semibold;
    color: $gray-950;
    margin-bottom: 16px;
  }

  &__body-portfolio-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 40%;
    padding: 0;
    list-style: none;
  }
}

@media (max-width: 600px) {
  .mainpage__widgets-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    width: 100vw;
    gap: 8px;
    padding: 0 4px;
  }
}
</style>