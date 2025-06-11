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
  width: 100%;
  height: 100%;
  background: $gray-0;
  border-radius: $radius-xl;
}

.app-pill-btn__button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}


</style> 