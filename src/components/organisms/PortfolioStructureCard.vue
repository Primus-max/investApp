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
const showSortMenu = ref(false);
const sortOptions = [
  { label: 'Рост ↑', value: 'growth-up' },
  { label: 'Рост ↓', value: 'growth-down' },
  { label: 'Доход', value: 'profit-up' },
  { label: 'Доход ↓', value: 'profit-down' },
];
const selectedSort = ref(sortOptions[1]);
function openSortMenu() { showSortMenu.value = !showSortMenu.value; }
function selectSort(option) { selectedSort.value = option; showSortMenu.value = false; }
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
    <!-- <div class="portfolio-structure-card__assets-header-row">
      <h2 class="portfolio-structure-card__assets-title">Активы</h2>
      <button class="portfolio-structure-card__sort-btn" @click="openSortMenu">{{ selectedSort.label }}</button>
      <div v-if="showSortMenu" class="portfolio-structure-card__sort-menu">
        <div v-for="option in sortOptions" :key="option.value" :class="['portfolio-structure-card__sort-menu-item', { 'portfolio-structure-card__sort-menu-item--active': selectedSort.value === option.value }]" @click="selectSort(option)">
          {{ option.label }}
        </div>
      </div>
    </div> -->
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
    justify-content: space-between;
    align-items: center;
    margin: 16px 0 8px 0;
    width: 100%;
    gap: 0;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar { display: none; }
  }
  &__tab {
    min-width: 72px;
    max-width: 72px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: $radius-md;
    font-size: $font-size-small;
    font-family: $font-main;
    font-weight: $font-weight-medium;
    line-height: 20px;
    background: transparent;
    color: $gray-500;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    padding: 8px 12px;
    box-sizing: border-box;
    &--active {
      background: $primary-50;
      color: $primary-500;
    }
  }
  &__assets-header-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 8px;
    position: relative;
  }
  &__assets-title {
    font-size: $font-size-h2;
    font-weight: $font-weight-semibold;
    color: $gray-900;
    margin: 0;
  }
  &__sort-btn {
    width: 34px;
    height: 22px;
    font-family: $font-main;
    font-style: normal;
    font-weight: $font-weight-medium;
    font-size: $font-size-body;
    line-height: 22px;
    color: $gray-700;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    flex: none;
    order: 0;
    flex-grow: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    transition: color 0.2s;
  }
  &__sort-menu {
    position: absolute;
    top: 32px;
    right: 0;
    min-width: 110px;
    background: $gray-0;
    border-radius: $radius-lg;
    box-shadow: 0 2px 8px rgba(44, 62, 80, 0.10);
    z-index: 10;
    padding: 4px 0;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  &__sort-menu-item {
    font-family: $font-main;
    font-size: $font-size-body;
    color: $gray-700;
    padding: 8px 16px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    &:hover {
      background: $gray-100;
      color: $primary-500;
    }
    &--active {
      color: $primary-500;
      font-weight: $font-weight-semibold;
      background: $gray-50;
    }
  }
}
</style> 