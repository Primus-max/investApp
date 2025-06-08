<template>
  <section class="tg-capital">
    <div class="tg-capital__label">Общий капитал</div>
    <div class="tg-capital__value">267 981 <span class="tg-capital__currency">₽</span></div>
    <div class="tg-capital__growth">+ 27 861,33 ₽ (18,44%) <span class="tg-capital__period">за все время</span></div>
    <button class="tg-capital__notif">
      <AppIcon name="notif" />
    </button>
  </section>
</template>
<script setup>
import AppIcon from '@/components/atoms/AppIcon.vue';
</script>
<style scoped lang="scss">
@import '@/styles/_variables.scss';
.tg-capital {
  position: relative;
  width: 100%;
  background: linear-gradient(120deg, #71B0F5 0%, #0416D5 86%);
  border-radius: 20px;
  color: #fff;
  padding: 20px 16px 16px 16px;
  margin-bottom: 8px;
  min-height: 100px;
  box-shadow: $shadow-main;
  &__label {
    font-size: 15px;
    opacity: 0.8;
    margin-bottom: 2px;
  }
  &__value {
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -0.5px;
    margin-bottom: 4px;
    display: flex;
    align-items: baseline;
  }
  &__currency {
    font-size: 20px;
    font-weight: 500;
    margin-left: 4px;
  }
  &__growth {
    font-size: 15px;
    font-weight: 500;
    opacity: 0.9;
    margin-bottom: 2px;
    color: #b3ffb3;
    .tg-capital__period {
      font-size: 13px;
      opacity: 0.7;
      margin-left: 8px;
    }
  }
  &__notif {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(255,255,255,0.12);
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    color: #fff;
    cursor: pointer;
  }
}
</style> 