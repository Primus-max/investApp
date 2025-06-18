<template>
  <MainLayout>    
    <section class="operations-page__body">
      <section class="page__header">
        <button class="page__back" @click="goBack">
          <IconArrowLeft class="page__back-icon" :color="'#4868EA'"/>
          <span class="page__back-text">Back</span>
        </button>        
      </section>
      <h1 class="operations-page__title">Операции</h1>
      <div class="operations-page__filters">
        <div class="operations-page__search-wrap">
          <AppInput
            v-model="searchQuery"
            placeholder="Поиск по активам"
          >
            <template #prefix>
              <IconSearch />
            </template>
          </AppInput>
        </div>
        <div class="operations-page__selects">
          <SortDropdown
            :options="periodOptions"
            v-model="selectedPeriod"
          >
            <span>{{ periodOptions.find(o => o.value === selectedPeriod)?.label }}</span>
            <IconArrowBottom style="margin-left:8px;" />
          </SortDropdown>

          <!-- Сортировка по операциям -->
          <SortDropdown
            class="filter-bubble"
            :options="typeOptions"
            v-model="selectedType"
          >
            <div class="filter-bubble__content">
              <span class="filter-bubble__label">{{ typeOptions.find(o => o.value === selectedType)?.label }}</span>
              <IconArrowBottom  />
            </div>
          </SortDropdown>

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

import AppInput from '@/components/atoms/AppInput.vue';
import IconArrowBottom from '@/components/atoms/icons/IconArrowBottom.vue';
import IconArrowLeft from '@/components/atoms/icons/IconArrowLeft.vue';
import IconSearch from '@/components/atoms/icons/IconSearch.vue';
import SortDropdown from '@/components/molecules/SortDropdown.vue';
import MainLayout from '@/layout/MainLayout.vue';
import { useOperationsStore } from '@/stores/operations.js';

const router = useRouter();
function goBack() {
  router.back();
}

const store = useOperationsStore();
const searchQuery = ref('');
const selectedPeriod = ref('all');
const periodOptions = [
  { label: '1–14 мая', value: 'may-1-14' },
  { label: 'Апрель', value: 'april' },
  { label: 'Март', value: 'march' },
];
const selectedType = ref('all');
const typeOptions = [
  { label: 'Все операции', value: 'all' },
  { label: 'Покупка', value: 'buy' },
  { label: 'Продажа', value: 'sell' },
  { label: 'Дивиденды', value: 'dividends' },
  { label: 'Купоны', value: 'coupons' },
  { label: 'Налоги', value: 'taxes' },
];

const filteredOperations = computed(() => {
  return store.operationsByDate
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
@import '@/styles/_sections.scss';

.page{
  &__back{
    padding: 0;
  }
  &__header{
    width: 100%;
    height: 60px;    
    display: flex;
    flex-direction: column;
    font-size: 20px;        
  }  
  &__back-icon{
    font-size: 22px;
    margin-right: 3px;
    display: flex;
    align-items: center;
    font-weight: 590;
  }
  &__back-text{
    color: $primary-400;
  }
}

.operations-page__body {
  background: $gray-50;
  min-height: 100vh;
  padding: $space-s $space-m $space-xl $space-m;
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

.filter-bubble {
  &__content {
    min-width: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
     padding: 8px 12px;   
  }  
  &__label {
    font-size: $font-size-body;
    font-weight: $font-weight-medium;
    color: $gray-900;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>

