<script setup>
const props = defineProps({
  value: { type: Number, required: true }, // 0-100
  color: { type: String, required: true },
  label: { type: String, required: true },
  percent: { type: Number, required: true }
});
</script>
<template>
  <div class="category-progress-bar">
    <div class="category-progress-bar__top-row">
      <div class="category-progress-bar__label">{{ label }}</div>
      <div class="category-progress-bar__percent">{{ percent }}%</div>
    </div>
    <div class="category-progress-bar__track">
      <div class="category-progress-bar__fill" :style="{ width: value + '%', background: color }"></div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import '@/styles/_variables.scss';
.category-progress-bar {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  width: 100%;
  &__top-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 2px;
  }
  &__label {
    font-size: $font-size-caption;
    color: $gray-700;
    font-weight: $font-weight-regular;
    text-align: left;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__percent {
    font-size: $font-size-caption;
    font-family: $font-main;
    font-style: normal;
    font-weight: $font-weight-regular;
    line-height: 20px;
    color: $gray-950;
    text-align: right;
    min-width: 20px;
    margin-left: $space-xs;
    flex: none;
    order: 1;
    flex-grow: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  &__track {
    width: 100%;
    height: 6px;
    background: $gray-100;
    border-radius: $radius-progress-bar;
    position: relative;
    overflow: hidden;
  }
  &__fill {
    height: 100%;
    border-radius: $radius-progress-bar;
    transition: width 0.3s;
  }
}
</style> 