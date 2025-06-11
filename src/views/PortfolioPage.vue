<template>
  <MainLayout>
    <template #header>
      <section class="page__header">
        <Header class="page__header-nav">
          <template #left>
            <span class="page__header-cancel"><IconArrowLeft />Back</span>
          </template>          
        </Header>
        <div class="page__header-stats-row">          
          <div class="page__header-stats-main">
            <div class="page__header-stats-info">
              <span class="page__header-stats-title">Общий капитал</span>
              <div class="page__header-stats-value-row">
                <span class="page__header-stats-value"> {{ isNotData ? '0' : '267 981' }}</span>
                <span class="page__header-stats-currency">₽</span>
              </div>
            </div>
            <div class="page__header-stats-icon">
              <div class="page__header-bell-bg">
                <Notification02 />
              </div>
            </div>
          </div>
          <div v-if="!isNotData" class="page__header-badge-row">
            <span class="page__header-badge">+ 27 861,33 ₽ <span
                class="page__header-badge-percent">(18,44%)</span></span>
            <span class="page__header-badge-period">за все время</span>
          </div>
        </div>
      </section>
    </template>

    <section class="page__body">
      <div class="page__body-header">
        <h1 class="page__body-header-title">Виджеты</h1>
        <div class="page__body-header-actions">
          <template v-if="!editMode">
            <button class="page__body-header-button" @click="editMode = true">
              <Edit01 class="page__body-header-button-icon" />
            </button>
          </template>
          <template v-else>
            <PlusButtonAtom />
            <button class="page__body-header-done" @click="editMode = false">
              Готов
            </button>
          </template>
        </div>
      </div>
      <div class="page__widgets-grid">
        <StatWidgetCard v-for="(widget, idx) in widgets" :key="idx" :title="widget.title" :value="widget.value"
          :percent="widget.trend.value" :positive="widget.trend.positive" :chart-data="widget.chartData"
          :type="idx === 2 ? 'rect' : 'square'" :editMode="editMode" />
      </div>
      <AppBanner class="page__app-banner">
        Умные советы и инструменты для роста
      </AppBanner>
      <section v-if="!isNotData" class="page__body-portfolio">
        <h2 class="page__body-portfolio-title">
          Мои портфели
        </h2>
        <ul class="page__body-portfolio-list">
          <PortfolioCard v-for="portfolio in portfolios" :key="portfolio.id" :portfolio="portfolio" />
        </ul>
      </section>
      <div v-else class="page__body-portfolio-empty">
        <AppPillButton>
          <template #icon>
            <IconBriefcase01 />
          </template>
          Добавить портфель
        </AppPillButton>
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layout/MainLayout.vue';
import IconArrowLeft from '@/components/atoms/icons/IconArrowLeft.vue';
// import IconMenuDots from '@/components/atoms/icons/IconMenuDots.vue';
</script>

<style scoped lang="scss">
@import '@/styles/_sections.scss';
</style>