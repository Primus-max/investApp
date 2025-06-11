<template>
  <button class="plus-btn-atom" type="button">
    <svg class="plus-btn-atom__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <line x1="10" y1="4" x2="10" y2="16" :stroke="iconColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="4" y1="10" x2="16" y2="10" :stroke="iconColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </button>
</template>

<script setup>
const iconColor = 'var(--color-text-main, #16181D)';
</script>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';

.plus-btn-atom {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 6px;
  width: 44px;
  min-width: 34px;
  height: 36px;
  background: $gray-0;
  opacity: 0.85;
  border-radius: $radius-xl;
  border: none;
  cursor: pointer;
  position: relative;
  flex: none;
  order: 0;
  flex-grow: 0;
  box-shadow: $shadow-main;

  &__icon {
    width: 20px;
    height: 20px;
    display: block;
    stroke: $color-text-main;        
  }
}
</style> 