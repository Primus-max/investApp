<script setup>
import { ref } from 'vue';

import VueApexCharts from 'vue3-apexcharts';

import AppPillButton from '@/components/atoms/AppPillButton.vue';
import CategoryListMolecule
  from '@/components/molecules/CategoryListMolecule.vue';

const props = defineProps({
  categories: { type: Array, required: true }, // [{ label, value, percent, color }]
  total: { type: String, required: true },
  assetsCount: { type: Number, required: true }
});

const apexSeries = props.categories.map(c => c.value);
const apexLabels = props.categories.map(c => c.label);
const apexColors = props.categories.map(c => c.color);
const chartOptions = ref({
  chart: {
    type: 'donut',
    background: 'transparent',
  },
  labels: apexLabels,
  colors: apexColors,
  stroke: {
    width: 6,
    colors: ['#fff']
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: { show: false }
      },
      expandOnClick: false,
    }
  }
});

const tabs = ['Активы', 'Компании', 'Отрасли', 'Валюта'];
const activeTab = ref(0);
</script>
<template>
  <div class="portfolio-structure-card">
    <div class="portfolio-structure-card__chart-block">
      <div class="portfolio-structure-card__chart-center">
        <apexchart type="donut" :options="chartOptions" :series="apexSeries" width="240" height="240" />
        <div class="portfolio-structure-card__chart-center-content">
          <div class="portfolio-structure-card__chart-sum">{{ total }}</div>
          <div class="portfolio-structure-card__chart-assets">{{ assetsCount }} активов</div>
        </div>
      </div>
      <div class="portfolio-structure-card__legend-row">
        <div v-for="cat in categories" :key="cat.label" class="portfolio-structure-card__legend-item">
          <span class="portfolio-structure-card__legend-dot" :style="{ background: cat.color }"></span>
          <span class="portfolio-structure-card__legend-label">{{ cat.label }}</span>
          <span class="portfolio-structure-card__legend-percent">{{ cat.percent }}%</span>
        </div>
      </div>
      <div class="portfolio-structure-card__tabs-row">
        <AppPillButton
          v-for="(tab, i) in tabs"
          :key="tab"
          :class="['portfolio-structure-card__tab', { 'portfolio-structure-card__tab--active': activeTab === i }]"
          @click="activeTab = i"
        >
          {{ tab }}
        </AppPillButton>
      </div>
      <CategoryListMolecule :categories="categories" />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import '@/styles/_variables.scss';
.portfolio-structure-card {
  background: $gray-0;
  border-radius: $radius-xl;
  box-shadow: 0 2px 16px rgba(44, 62, 80, 0.06);
  padding: $space-l $space-m;
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-l;
  &__chart-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-m;
    width: 100%;
  }
  &__chart-center {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 240px;
    height: 240px;
  }
  &__chart-center-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: none;
  }
  &__chart-sum {
    font-size: 22px;
    font-weight: $font-weight-semibold;
    color: $gray-900;
    line-height: 1.1;
  }
  &__chart-assets {
    font-size: $font-size-small;
    color: $gray-500;
    margin-top: 2px;
  }
  &__legend-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: $space-m;
    margin: 16px 0 0 0;
    width: 100%;
    flex-wrap: wrap;
  }
  &__legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: $font-size-body;
    font-weight: $font-weight-medium;
    color: $gray-700;
    min-width: 90px;
    justify-content: center;
  }
  &__legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
  }
  &__legend-label {
    font-size: $font-size-body;
    color: $gray-700;
  }
  &__legend-percent {
    font-weight: $font-weight-semibold;
    color: $gray-900;
    margin-left: 2px;
  }
  &__tabs-row {
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin: 16px 0 8px 0;
    width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar { display: none; }
  }
  &__tab {
    font-size: $font-size-body;
    font-weight: $font-weight-medium;
    border-radius: $radius-lg;
    padding: 6px 16px;
    background: $gray-50;
    color: $gray-500;
    white-space: nowrap;
    &--active {
      background: $primary-50;
      color: $primary-400;
    }
  }
}
</style> 