<template>
  <section class="tg-widgets">
    <div class="tg-widgets__title">Виджеты</div>
    <div class="tg-widgets__grid">
      <div class="tg-widget tg-widget--profit">
        <div class="tg-widget__label">Прибыль</div>
        <div class="tg-widget__value tg-widget__value--green">+67 981 ₽ <span>12% ↑</span></div>
        <div class="tg-widget__chart tg-widget__chart--green"></div>
      </div>
      <div class="tg-widget tg-widget--loss">
        <div class="tg-widget__label">Доходность</div>
        <div class="tg-widget__value tg-widget__value--red">-67 981 ₽ <span>8% ↓</span></div>
        <div class="tg-widget__chart tg-widget__chart--red"></div>
      </div>
      <div class="tg-widget tg-widget--capital">
        <div class="tg-widget__label">Стоимость капитала</div>
        <div class="tg-widget__value tg-widget__value--green">+67 981 ₽ <span>24% ↑</span></div>
        <div class="tg-widget__chart tg-widget__chart--green"></div>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
@import '@/styles/_variables.scss';
.tg-widgets {
  width: 100%;
  margin-bottom: 8px;
  &__title {
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 8px;
    color: $gray-900;
  }
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 8px;
    width: 100%;
  }
}
.tg-widget {
  background: #fff;
  border-radius: 16px;
  box-shadow: $shadow-main;
  padding: 12px 10px 10px 10px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &__label {
    font-size: 14px;
    color: $gray-700;
    margin-bottom: 2px;
  }
  &__value {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 4px;
    &--green { color: #1bc47d; }
    &--red { color: #ff4d4f; }
  }
  &__chart {
    width: 100%;
    height: 28px;
    border-radius: 8px;
    background: $gray-100;
    &--green { background: linear-gradient(90deg, #b3ffb3 0%, #1bc47d 100%); }
    &--red { background: linear-gradient(90deg, #ffd6d6 0%, #ff4d4f 100%); }
  }
}
</style> 