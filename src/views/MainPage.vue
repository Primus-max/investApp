<template>
  <MainLayout>
    <template #header>
      <div class="mainpage__header">
        <Header class="mainpage__header-nav">
          <template #left>
            <button class="mainpage__header-cancel">Cancel</button>
          </template>
          <template #right>
            <p class="mainpage__header-nav-title"><span>Kapitalist</span> <span>bot</span></p>
          </template>
        </Header>
      </div>
    </template>
    <div class="mainpage__body">
      <div class="mainpage__body-title">Общий капитал</div>
      <div class="mainpage__body-balance">267 981</div>
      <div class="mainpage__body-currency">₽</div>
      <div class="mainpage__body-title">Общий капитал</div>
      <div class="mainpage__body-balance">267 981</div>
      <div class="mainpage__body-currency">₽</div>
      <div class="mainpage__body-title">Общий капитал</div>
      <div class="mainpage__body-balance">267 981</div>
      <div class="mainpage__body-currency">₽</div>
      <div class="mainpage__body-title">Общий капитал</div>
      <div class="mainpage__body-balance">267 981</div>
      <div class="mainpage__body-currency">₽</div>
      <div class="mainpage__body-title">Общий капитал</div>
      <div class="mainpage__body-balance">267 981</div>
      <div class="mainpage__body-currency">₽</div>

    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layout/MainLayout.vue';
import Header from '@/components/organisms/Header.vue';
// Только разметка-заглушка
</script>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';

.mainpage {
  width: 100%;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__header {
    width: 100%;
    height: auto;
    color: #fff;
    display: flex;
    flex-direction: column;
    // align-items: center;
    // justify-content: center;
    font-size: 20px;
    font-weight: 600;
  }

  &__header-nav {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 64px;
  }

  &__header-cancel,
  &__header-nav-spacer {
    min-width: 60px;
    background: none;
    border: none;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    padding: 0 12px;
  }

  &__header-nav-title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-weight: 600;
    font-size: 18px;
    margin: 0;
    line-height: 1.1;
    pointer-events: none;
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    background: #960000;
    color: #181818;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    border-radius: 20px;
    margin-bottom: 16px;
  }
}
</style>