<template>
  <MainLayout>
    <template #header>
      <section class="page__header">
        <button class="page__back" @click="goBack">
          <IconArrowLeft class="page__back-icon" />
          <span class="page__back-text">Назад</span>
        </button>
        <div class="page__header-title">Операции</div>
      </section>
    </template>
    <section class="operations-page__body">
      <h1 class="operations-page__title">Операции</h1>
      <div class="operations-page__filters">
        <div class="operations-page__search-wrap">
          <span class="operations-page__search-icon">
            <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="7" stroke="#AEB8D4" stroke-width="2"/><path d="M15.5 15.5L13 13" stroke="#AEB8D4" stroke-width="2" stroke-linecap="round"/></svg>
          </span>
          <input
            class="operations-page__search"
            placeholder="Поиск по активам"
            v-model="searchQuery"
            type="text"
          />
        </div>
        <div class="operations-page__selects">
          <button class="operations-page__filter" @click="() => showPeriod = !showPeriod">
            {{ periodOptions.find(o => o.value === selectedPeriod)?.label }}
            <span class="operations-page__filter-arrow">▼</span>
          </button>
          <button class="operations-page__filter" @click="() => showType = !showType">
            {{ typeOptions.find(o => o.value === selectedType)?.label }}
            <span class="operations-page__filter-arrow">▼</span>
          </button>
        </div>
        <div v-if="showPeriod" class="operations-page__dropdown">
          <div v-for="option in periodOptions" :key="option.value" class="operations-page__dropdown-item" @click="selectPeriod(option.value)">
            {{ option.label }}
          </div>
        </div>
        <div v-if="showType" class="operations-page__dropdown">
          <div v-for="option in typeOptions" :key="option.value" class="operations-page__dropdown-item" @click="selectType(option.value)">
            {{ option.label }}
          </div>
        </div>
      </div>
      <div class="operations-page__list">
        <div v-for="group in filteredOperations" :key="group.date" class="operations-page__group">
          <div class="operations-page__date">{{ group.date }}</div>
          <div class="operations-page__cards">
            <div v-for="item in group.items" :key="item.bank + item.amount + item.type" class="operations-page__card">
              <img :src="item.icon" :alt="item.bank" class="operations-page__icon" />
              <div class="operations-page__info">
                <div class="operations-page__bank">{{ item.bank }}</div>
                <div class="operations-page__type">{{ item.type }}</div>
              </div>
              <div class="operations-page__meta">
                <div :class="['operations-page__amount', item.amount > 0 ? 'operations-page__amount--positive' : 'operations-page__amount--negative']">
                  {{ item.amount > 0 ? '+' : '' }}{{ formatAmount(item.amount) }} ₽
                </div>
                <div class="operations-page__details">
                  {{ item.count }} шт · {{ formatAmount(item.price) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import {
  computed,
  ref,
} from 'vue';

import { useRouter } from 'vue-router';

import IconArrowLeft from '@/components/atoms/icons/IconArrowLeft.vue';
import { useOperationsStore } from '@/stores/operations.js';

const router = useRouter();
function goBack() {
  router.back();
}

const store = useOperationsStore();
const searchQuery = ref('');
const selectedPeriod = ref('all');
const selectedType = ref('all');
const showPeriod = ref(false);
const showType = ref(false);

const periodOptions = [
  { label: 'Период', value: 'all' },
  { label: 'Май', value: 'may' },
  { label: 'Апрель', value: 'april' },
];
const typeOptions = [
  { label: 'Все операции', value: 'all' },
  { label: 'Покупка', value: 'buy' },
  { label: 'Продажа', value: 'sell' },
];

function selectPeriod(val) {
  selectedPeriod.value = val;
  showPeriod.value = false;
}
function selectType(val) {
  selectedType.value = val;
  showType.value = false;
}

const filteredOperations = computed(() => {
  return store.operationsByDate
    .filter(group => {
      if (selectedPeriod.value === 'all') return true;
      if (selectedPeriod.value === 'may' && group.date.includes('мая')) return true;
      if (selectedPeriod.value === 'april' && group.date.includes('апреля')) return true;
      return false;
    })
    .map(group => ({
      date: group.date,
      items: group.items.filter(item => {
        const matchesType = selectedType.value === 'all' ||
          (selectedType.value === 'buy' && item.type === 'Покупка') ||
          (selectedType.value === 'sell' && item.type === 'Продажа');
        const matchesSearch = !searchQuery.value || item.bank.toLowerCase().includes(searchQuery.value.toLowerCase());
        return matchesType && matchesSearch;
      })
    }))
    .filter(group => group.items.length > 0);
});

function formatAmount(val) {
  return Math.abs(val).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
</script>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';

.page__header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: $space-m $space-m 0 $space-m;
  background: $color-bg-main;
  min-height: 56px;
}
.page__back {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: $primary-400;
  font-size: 17px;
  font-family: 'SF Pro', Arial, sans-serif;
  font-weight: 400;
  padding: 0 8px 0 0;
  height: 40px;
  cursor: pointer;
  outline: none;
  box-shadow: none;
  transition: background 0.15s;
}
.page__back-icon {
  font-size: 22px;
  margin-right: 3px;
  display: flex;
  align-items: center;
  font-weight: 590;
  color: $primary-400;
}
.page__back-text {
  font-size: 17px;
  font-family: 'SF Pro', Arial, sans-serif;
  font-weight: 400;
  letter-spacing: -0.4px;
  color: $primary-400;
}
.page__header-title {
  font-size: $font-size-h2;
  font-weight: $font-weight-semibold;
  color: $gray-900;
  margin-left: 8px;
}

.operations-page__body {
  background: $gray-50;
  min-height: 100vh;
  padding: $space-l $space-s $space-xl $space-s;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.operations-page__title {
  font-size: $font-size-h2;
  font-weight: $font-weight-semibold;
  color: $gray-900;
  margin-bottom: $space-m;
  margin-top: $space-m;
}

.operations-page__filters {
  display: flex;
  flex-direction: column;
  gap: $space-m;
  margin-bottom: $space-m;
}

.operations-page__search-wrap {
  position: relative;
  width: 100%;
}
.operations-page__search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  pointer-events: none;
}
.operations-page__search {
  width: 100%;
  background: $gray-0;
  border-radius: $radius-xl;
  box-shadow: $shadow-main;
  border: none;
  padding: 14px 16px 14px 44px;
  font-size: $font-size-body;
  color: $gray-900;
  outline: none;
  transition: box-shadow 0.2s;
}
.operations-page__search::placeholder {
  color: $gray-400;
}

.operations-page__selects {
  display: flex;
  gap: $space-m;
  margin-top: 0;
}

.operations-page__filter {
  flex: 1;
  background: $gray-0;
  border-radius: $radius-xl;
  box-shadow: $shadow-main;
  border: none;
  padding: 12px 36px 12px 16px;
  font-size: $font-size-body;
  color: $gray-900;
  text-align: left;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: box-shadow 0.2s;
}
.operations-page__filter-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: $gray-400;
  pointer-events: none;
}

.operations-page__dropdown {
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 8px;
  background: $gray-0;
  border-radius: $radius-xl;
  box-shadow: $shadow-main;
  z-index: 10;
  padding: 8px 0;
}
.operations-page__dropdown-item {
  padding: 12px 24px;
  font-size: $font-size-body;
  color: $gray-900;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: $gray-100;
  }
}

.operations-page__list {
  display: flex;
  flex-direction: column;
  gap: $space-l;
}

.operations-page__group {
  display: flex;
  flex-direction: column;
  gap: $space-s;
}

.operations-page__date {
  font-size: $font-size-body;
  font-weight: $font-weight-semibold;
  color: $gray-500;
  margin-bottom: 2px;
  margin-top: $space-m;
}

.operations-page__cards {
  display: flex;
  flex-direction: column;
  gap: $space-s;
}

.operations-page__card {
  display: flex;
  align-items: center;
  background: $gray-0;
  border-radius: $radius-lg;
  box-shadow: $shadow-main;
  padding: $space-m;
  gap: $space-m;
}

.operations-page__icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: $gray-100;
  object-fit: cover;
}

.operations-page__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 80px;
}

.operations-page__bank {
  font-size: $font-size-body;
  font-weight: $font-weight-medium;
  color: $gray-900;
}

.operations-page__type {
  font-size: $font-size-small;
  color: $gray-500;
}

.operations-page__meta {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.operations-page__amount {
  font-size: $font-size-body;
  font-weight: $font-weight-semibold;
  &--positive { color: #03B65C; }
  &--negative { color: $color-error; }
}

.operations-page__details {
  font-size: $font-size-small;
  color: $gray-500;
}
</style>

