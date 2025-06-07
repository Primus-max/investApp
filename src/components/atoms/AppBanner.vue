<template>
  <div class="app-banner">
    <div class="app-banner__bg"></div>
    <div class="app-banner__waves"></div>
    <div class="app-banner__fractal"></div>
    <div class="app-banner__fractal-glass"></div>
    <div class="app-banner__plastic"></div>
    <div class="app-banner__glass"></div>
    <div class="app-banner__shapes">
      <div class="app-banner__shape app-banner__shape--1"></div>
      <div class="app-banner__shape app-banner__shape--2"></div>
      <div class="app-banner__shape app-banner__shape--3"></div>
      <div class="app-banner__shape app-banner__shape--4"></div>
      <div class="app-banner__shape app-banner__shape--5"></div>
      <div class="app-banner__shape app-banner__shape--6"></div>
      <div class="app-banner__shape app-banner__shape--7"></div>
      <div class="app-banner__shape app-banner__shape--8"></div>
      <div class="app-banner__shape app-banner__shape--9"></div>
      <div class="app-banner__shape app-banner__shape--10"></div>
      <div class="app-banner__shape app-banner__shape--11"></div>
      <div class="app-banner__shape app-banner__shape--12"></div>
      <div class="app-banner__shape app-banner__shape--13"></div>
    </div>
    <div class="app-banner__shadow"></div>
    <div class="app-banner__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
// Нет пропсов, только слот
</script>

<style scoped lang="scss">
@import '@/styles/atoms/app-banner.scss';
</style> 