<template>
  <div class="app-pill-btn">
    <button class="app-pill-btn__button">
      <slot />
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
  justify-content: center;
  align-items: center;
  background: $gray-0;
  border-radius: $radius-xl;
  padding: 15px 12px;
}

.app-pill-btn__button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  width: 100%;
  height: 100%;
  font: inherit;
  color: inherit;
  cursor: pointer;
}
</style> 