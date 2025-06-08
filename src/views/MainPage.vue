<template>
  <div class="tg-app">
    <Header class="tg-app__header">
      <template #left>
        <AppIcon name="logo" />
      </template>
      Портфель
      <template #right>
        <AppIcon name="settings" />
      </template>
    </Header>
    <main class="tg-app__main">
      <div class="tg-app__container">
        <AppBanner class="tg-app__banner" />
        <section class="tg-app__widget tg-app__widget--main">
          <!-- Здесь будет график/основной виджет -->
        </section>
      </div>
    </main>
    <TabBar class="tg-app__tabbar" :tabs="tabs" :activeIndex="0" />
  </div>
</template>

<script setup>
import AppBanner from '@/components/atoms/AppBanner.vue';
import AppIcon from '@/components/atoms/AppIcon.vue';
import TabBar from '@/components/molecules/TabBar.vue';
import Header from '@/components/organisms/Header.vue';
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';
.tg-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: $gray-950;
  &__header {
    flex: 0 0 auto;
    position: sticky;
    top: 0;
    z-index: 10;
    background: $gray-950;
  }
  &__main {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0;
  }
  &__container {
    width: 100%;
    max-width: 358px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 20px 0 0 0;
  }
  &__banner {
    width: 100%;
    margin-bottom: 12px;
  }
  &__widget {
    width: 100%;
    background: #fff;
    border-radius: $radius-large;
    box-shadow: $shadow-main;
    min-height: 140px;
    padding: 0;
    margin-bottom: 0;
    &--main {
      /* для главного виджета */
    }
  }
  &__tabbar {
    flex: 0 0 auto;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    background: transparent;
    display: flex;
    justify-content: center;
    padding-bottom: env(safe-area-inset-bottom);
  }
}
@media (min-width: 500px) {
  .tg-app {
    max-width: 430px;
    margin: 0 auto;
    border-radius: 24px;
    box-shadow: 0 0 32px rgba(16,18,24,0.10);
    overflow: hidden;
  }
}
</style> 