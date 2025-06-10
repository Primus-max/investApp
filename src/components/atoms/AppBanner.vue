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
@import '@/styles/_variables.scss';

.app-banner {
  position: relative;
  width: 358px;
  height: 80px;
  border-radius: 20px;
  overflow: hidden;
  filter: drop-shadow(0px 4px 8px rgba(4, 16, 213, 0.2));
  display: flex;
  align-items: stretch;
  background: transparent;

  &__bg {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(180deg, #71B0F5 0%, #0416D5 86%);
    width: 100%;
    height: 100%;
    border-radius: 20px;
    mix-blend-mode: normal;
  }

  &__waves {
    position: absolute;
    inset: 0;
    z-index: 2;
    background: url('@/assets/images/waves_back.png') center/cover no-repeat;
    opacity: 1;
    mix-blend-mode: normal;
    border-radius: 20px;
    pointer-events: none;
  }

  &__fractal {
    position: absolute;
    inset: 0;
    z-index: 3;
    background: url('@/assets/images/fractal.png') center/cover no-repeat;
    opacity: 1;
    mix-blend-mode: normal;
    border-radius: 20px;
    pointer-events: none;
  }

  &__fractal-glass {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 140px;
    transform: translateY(-50%);
    background: linear-gradient(180deg, #71B0F5 0%, #0416D5 86%);
    mix-blend-mode: normal;
    z-index: 4;
    pointer-events: none;
    border-radius: 20px;
  }

  &__plastic {
    position: absolute;
    width: 343px;
    height: 609.78px;
    left: 0px;
    top: 0px;
    mix-blend-mode: overlay;
    border-radius: 2.54px;
    background: linear-gradient(270deg, rgba(255,255,255,0.0075) -20%, rgba(40,40,40,0.093) 75.76%, rgba(255,255,255,0.0075) 123.64%);
    filter: blur(28.58px);
    z-index: 5;
    pointer-events: none;
  }

  &__glass {
    position: absolute;
    width: 472.48px;
    height: 339.33px;
    left: -28.48px;
    top: -133.84px;
    transform: rotate(8.81deg);
    background: linear-gradient(270deg, rgba(255,255,255,0.0075) -20%, rgba(40,40,40,0.093) 75.76%, rgba(255,255,255,0.0075) 123.64%);
    filter: blur(28.58px);
    z-index: 6;
    pointer-events: none;
  }

  &__shapes {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 7;
    pointer-events: none;
    &::before, &::after {
      content: '';
      display: none;
    }
  }

  .app-banner__shape {
    position: absolute;
    background: linear-gradient(270deg, rgba(255,255,255,0.0075) -20%, rgba(40,40,40,0.0934) 75.76%, rgba(255,255,255,0.0075) 123.64%);
    backdrop-filter: blur(28.5833px);
    -webkit-backdrop-filter: blur(28.5833px);
    opacity: 0.15;
    mix-blend-mode: normal;
    border-radius: 20px;
    pointer-events: none;
  }
  .app-banner__shape--1 { left: -7.47%; right: 98.08%; top: -93.25%; bottom: -47%; transform: matrix(0.99, 0.15, -0.16, 0.99, 0, 0); }
  .app-banner__shape--2 { left: 1.81%; right: 88.8%; top: -89.73%; bottom: -50.53%; transform: matrix(0.99, 0.15, -0.16, 0.99, 0, 0); }
  .app-banner__shape--3 { left: 11.09%; right: 79.52%; top: -86.2%; bottom: -54.05%; transform: matrix(0.99, 0.15, -0.16, 0.99, 0, 0); }
  .app-banner__shape--4 { left: 20.38%; right: 70.24%; top: -82.68%; bottom: -57.57%; transform: matrix(0.99, 0.15, -0.16, 0.99, 0, 0); }
  .app-banner__shape--5 { left: 29.66%; right: 60.96%; top: -79.16%; bottom: -61.1%; transform: matrix(0.99, 0.15, -0.16, 0.99, 0, 0); }
  .app-banner__shape--6 { left: 38.94%; right: 51.68%; top: -75.63%; bottom: -64.62%; transform: matrix(0.99, 0.15, -0.16, 0.99, 0, 0); }
  .app-banner__shape--7 { left: 48.22%; right: 42.4%; top: -72.11%; bottom: -68.14%; transform: matrix(0.99, 0.15, -0.16, 0.99, 0, 0); }
  .app-banner__shape--8 { left: 57.5%; right: 33.12%; top: -68.58%; bottom: -71.67%; transform: matrix(0.99, 0.15, -0.16, 0.99, 0, 0); }
  .app-banner__shape--9 { left: 66.78%; right: 23.84%; top: -65.06%; bottom: -75.19%; transform: matrix(0.99, 0.15, -0.16, 0.99, 0, 0); }
  .app-banner__shape--10 { left: 76.06%; right: 14.55%; top: -61.54%; bottom: -78.71%; transform: matrix(0.99, 0.15, -0.16, 0.99, 0, 0); }
  .app-banner__shape--11 { left: 85.34%; right: 5.27%; top: -58.01%; bottom: -82.24%; transform: matrix(0.99, 0.15, -0.16, 0.99, 0, 0); }
  .app-banner__shape--12 { left: 94.62%; right: -4.01%; top: -54.49%; bottom: -85.76%; transform: matrix(0.99, 0.15, -0.16, 0.99, 0, 0); }
  .app-banner__shape--13 { left: 103.91%; right: -13.29%; top: -50.97%; bottom: -89.28%; transform: matrix(0.99, 0.15, -0.16, 0.99, 0, 0); }

  &__shadow {
    position: absolute;
    height: 260px;
    left: -1px;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    background: url('@/assets/images/waves_back.png');
    mix-blend-mode: plus-lighter;
    opacity: 0.3;
    z-index: 8;
    pointer-events: none;
    border-radius: 20px;
  }

  &__content {    
    z-index: 10;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 0 16px;
    justify-content: space-between;
    color: $color-text-main;
  }

  &__text-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    min-width: 0;
  }

  &__title {
    font-family: 'SF Pro Rounded', $font-main, sans-serif;
    font-size: 22px;
    font-weight: 600;
    color: $color-text-main;
    line-height: 28px;
    margin-bottom: 0;
    white-space: pre-line;
  }

  &__subtitle {
    font-family: 'SF Pro Rounded', $font-main, sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: $color-text-main;
    line-height: 20px;
    opacity: 0.9;
    white-space: pre-line;
  }

  &__icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    z-index: 11;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 48px;
      height: 48px;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.25));
    }
  }
}
</style> 