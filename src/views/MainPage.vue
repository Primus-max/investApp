<template>
  <div class="tg-app__container">
    <CapitalWidget />
    <WidgetsSection />
    <section class="tg-app__banner">
      <AppBanner>
        <div class="tg-banner__content">
          <div class="tg-banner__chips">3/3 доступно</div>
          <div class="tg-banner__title">Умные советы ИИ</div>
          <div class="tg-banner__desc">Подскажет, когда купить или продать</div>
        </div>
      </AppBanner>
    </section>
    <PortfolioList />

    <PortfolioList /><PortfolioList />
    <PortfolioList />
    <PortfolioList />
    <PortfolioList />
  </div>
</template>

<script setup>
import AppBanner from '@/components/atoms/AppBanner.vue';
import CapitalWidget from '@/components/organisms/CapitalWidget.vue';
import PortfolioList from '@/components/organisms/PortfolioList.vue';
import WidgetsSection from '@/components/organisms/WidgetsSection.vue';
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';
.tg-app__container {
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px 0 0 0;
}
</style> 