<template>
  <div class="widget-card" :class="`widget-card--${color}`">
    <div class="widget-card__header">
      <slot name="header">
        <span class="widget-card__title">{{ title }}</span>
      </slot>
    </div>
    <div class="widget-card__main">
      <span :class="['widget-card__value', { 'widget-card__value--positive': trend.positive, 'widget-card__value--negative': !trend.positive }]">
        {{ trend.positive ? '+' : '-' }} {{ value.toLocaleString() }} <span class="widget-card__currency">{{ currency }}</span>
      </span>
      <span :class="['widget-card__trend', { 'widget-card__trend--positive': trend.positive, 'widget-card__trend--negative': !trend.positive }]">
        {{ Math.abs(trend.value) }}% <span v-if="trend.positive">↑</span><span v-else>↓</span>
      </span>
    </div>
    <div class="widget-card__chart">
      <!-- Здесь будет чарт, пока заглушка -->
      <div class="widget-card__chart-mock"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  value: { type: [Number, String], required: true },
  currency: { type: String, default: '' },
  trend: { type: Object, required: true }, // { value: Number, positive: Boolean }
  chartData: { type: Array, default: () => [] },
  color: { type: String, default: 'green' },
  chartOptions: { type: Object, default: () => ({}) }
})
</script>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';

.widget-card {
  border-radius: $radius-large;
  background: $gray-0;
  box-shadow: $shadow-main;
  padding: $space-m;
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
  max-width: 220px;
  min-height: 140px;
  &__header {
    font-family: $font-main;
    font-size: $font-size-h3;
    font-weight: $font-weight-medium;
    color: $color-text-main;
    margin-bottom: $space-xs;
  }
  &__title {
    font-family: $font-main;
    font-size: $font-size-h3;
    font-weight: $font-weight-medium;
    color: $color-text-main;
  }
  &__main {
    display: flex;
    align-items: flex-end;
    gap: $space-xs;
    margin-bottom: $space-xs;
  }
  &__value {
    font-family: $font-main;
    font-size: 28px;
    font-weight: $font-weight-bold;
    line-height: 32px;
    letter-spacing: -0.4px;
    color: $color-success;
    &--negative { color: $color-error; }
    &--positive { color: $color-success; }
  }
  &__currency {
    font-size: 20px;
    font-weight: $font-weight-medium;
    color: $color-text-main;
    margin-left: 2px;
  }
  &__trend {
    font-family: $font-main;
    font-size: 16px;
    font-weight: $font-weight-regular;
    line-height: 20px;
    margin-left: 8px;
    &--positive { color: $color-success; }
    &--negative { color: $color-error; }
  }
  &__chart {
    width: 100%;
    height: 48px;
    margin-top: $space-xs;
    border-radius: $radius-main;
    overflow: hidden;
    background: transparent;
    display: flex;
    align-items: flex-end;
  }
  &__chart-mock {
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(90deg, #e0f7e9 0 2px, transparent 2px 8px);
    border-radius: $radius-main;
  }
  &--green { background: #e9f9f0; }
  &--red { background: #fff0f0; }
  &--gray { background: $gray-50; }
}
</style> 