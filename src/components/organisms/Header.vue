<template>
  <header class="header">
    <div class="header__icon">
      <slot name="left" />
    </div>
    <span class="header__title">
      <slot />
    </span>
    <div class="header__action">
      <slot name="right" />
    </div>
  </header>
</template>

<script setup>
// No props, only slots
</script>

<style scoped lang="scss">
@import '@/styles/organisms/header.scss';
</style> 