<template>
  <MainLayout>
    <template #header>
      <div class="portfolio-header">
        <div class="portfolio-header__bg"></div>
        <div class="portfolio-header__content">
          <div class="portfolio-header__info">
            <div class="portfolio-header__title">Консервативный</div>
            <div class="portfolio-header__subtitle">Сбербанк</div>
          </div>
          <button class="portfolio-header__menu">
            <!-- Здесь иконка меню/настроек, например, <IconMenuDots /> -->
          </button>
        </div>
      </div>
    </template>
    <div class="portfolio-page__body">
      <!-- Portfolio details content here -->
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layout/MainLayout.vue';
// import IconMenuDots from '@/components/atoms/icons/IconMenuDots.vue';
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.portfolio-header {
  position: relative;
  width: 100%;
  min-height: 104px;
  background: linear-gradient(90deg, $primary-400 0%, $primary-500 100%);
  border-radius: 0 0 $radius-xl $radius-xl;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.portfolio-header__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}
.portfolio-header__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 24px 24px 20px 24px;
  width: 100%;
  gap: 12px;
}
.portfolio-header__info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
}
.portfolio-header__title {
  font-family: $font-main;
  font-size: 18px;
  font-weight: $font-weight-semibold;
  color: $gray-0;
  line-height: 24px;
}
.portfolio-header__subtitle {
  font-family: $font-main;
  font-size: $font-size-small;
  font-weight: $font-weight-medium;
  color: $gray-0;
  opacity: 0.8;
  line-height: 20px;
  margin-top: 2px;
}
.portfolio-header__menu {
  background: none;
  border: none;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $gray-0;
  cursor: pointer;
  margin-left: auto;
}

.portfolio-page__body {
  width: 100%;
  min-height: 100vh;
  background: $color-bg-main;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $space-l 0;
}
</style> 