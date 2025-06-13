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
    <div class="category-progress-bar__label">{{ label }}</div>
    <div class="category-progress-bar__track">
      <div class="category-progress-bar__fill" :style="{ width: value + '%', background: color }"></div>
    </div>
    <div class="category-progress-bar__percent">{{ percent }}%</div>
  </div>
</template>
<style scoped lang="scss">
@import '@/styles/_variables.scss';
.category-progress-bar {
  display: flex;
  align-items: center;
  gap: $space-s;
  width: 100%;
  &__label {
    flex: 1;
    font-size: $font-size-body;
    color: $gray-700;
    font-weight: $font-weight-medium;
  }
  &__track {
    flex: 2;
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
  &__percent {
    min-width: 32px;
    text-align: right;
    font-size: $font-size-body;
    color: $gray-900;
    font-weight: $font-weight-semibold;
  }
}
</style> 