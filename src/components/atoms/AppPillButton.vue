<template>
  <div class="app-pill-btn">
    <button class="app-pill-btn__button">
      <span class="app-pill-btn__icon">
        <slot name="icon" />
      </span>
      <span class="app-pill-btn__label">
        <slot />
      </span>
    </button>
  </div>
</template>

<script setup>
// Нет пропсов, только универсальные слоты
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.app-pill-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 358px;
  height: 100px;
  background: $gray-0;
  border-radius: $radius-xl;
}

.app-pill-btn__button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 6px;
  width: 168px;
  height: 36px;  
  border-radius: $radius-xl;
  border: none;
  cursor: pointer;
  box-shadow: none;
  transition: background 0.15s;
}

.app-pill-btn__icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $primary-400;
  fill: currentColor;
}

.app-pill-btn__icon :deep(svg) {
  width: 20px;
  height: 20px;
  display: block;
  color: inherit;
  fill: currentColor;
}

.app-pill-btn__label {
  font-family: $font-main;
  font-style: normal;
  font-weight: $font-weight-medium;
  font-size: $font-size-small;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  color: $primary-400;
  white-space: nowrap;
}
</style> 