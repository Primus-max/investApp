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

        <div class="mainpage__header-stats"> 
          <p class="mainpage__header-stats-item">
            <span class="mainpage__header-stats-title">Общий капитал</span>
            <span class="mainpage__header-stats-value">{{ amount }} ₽</span>            
          </p>                   
        </div>
      </div>
    </template>

    <div class="mainpage__body">
      <h1>Виджеты</h1>
      <div class="mainpage__widgets-grid">
        <StatWidgetCard
          v-for="(widget, idx) in widgets"
          :key="idx"
          :title="widget.title"
          :value="widget.value"
          :percent="widget.trend.value"
          :positive="widget.trend.positive"
          :chart-data="widget.chartData"
          :type="idx === 2 ? 'rect' : 'square'"
        />
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue';

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
    chartData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    color: 'green',
  },
  {
    title: 'Доходность',
    value: 67981,
    currency: '₽',
    trend: { value: 8, positive: false },
    chartData: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    color: 'red',
  },
  {
    title: 'Стоимость капитала',
    value: 67981,
    currency: '₽',
    trend: { value: 24, positive: true },
    chartData: [2, 4, 6, 8, 10, 8, 6, 4, 2, 1],
    color: 'green',
  },
];
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
    height: 140px;
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
    margin-bottom: 16px;
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
    grid-template-columns: $widget-card-width $widget-card-width;
    grid-template-rows: $widget-card-height $widget-card-height;
    grid-template-areas:
      'w1 w2'
      'w3 w3';
    gap: 16px;
    width: calc(2 * #{$widget-card-width} + 16px);
    max-width: 100vw;
    margin: 0 auto;

    & > :nth-child(1) { grid-area: w1; }
    & > :nth-child(2) { grid-area: w2; }
    & > :nth-child(3) { grid-area: w3; }
  }

  &__widget-card {  
    width: 175px;
    height: 166px;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    position: relative;
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