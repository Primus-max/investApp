<template>
  <section class="tg-portfolios">
    <div class="tg-portfolios__title">Мои портфели</div>
    <div class="tg-portfolios__list">
      <div class="tg-portfolio">
        <div class="tg-portfolio__logo tg-portfolio__logo--main"></div>
        <div class="tg-portfolio__info">
          <div class="tg-portfolio__name">Консервативный</div>
          <div class="tg-portfolio__sum">8 020,66 ₽ <span class="tg-portfolio__growth tg-portfolio__growth--green">+5 404,71 · 68% ↑</span></div>
        </div>
      </div>
      <div class="tg-portfolio">
        <div class="tg-portfolio__logo tg-portfolio__logo--aggr"></div>
        <div class="tg-portfolio__info">
          <div class="tg-portfolio__name">Агрессивный <span class="tg-portfolio__badge">+5</span></div>
          <div class="tg-portfolio__sum">8 020,66 ₽ <span class="tg-portfolio__growth tg-portfolio__growth--green">+5 404,71 · 68% ↑</span></div>
        </div>
      </div>
      <div class="tg-portfolio">
        <div class="tg-portfolio__logo tg-portfolio__logo--main"></div>
        <div class="tg-portfolio__info">
          <div class="tg-portfolio__name">Консервативный</div>
          <div class="tg-portfolio__sum">8 020,66 ₽ <span class="tg-portfolio__growth tg-portfolio__growth--green">+5 404,71 · 68% ↑</span></div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
@import '@/styles/_variables.scss';
.tg-portfolios {
  width: 100%;
  margin-bottom: 16px;
  &__title {
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 8px;
    color: $gray-900;
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
.tg-portfolio {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 16px;
  box-shadow: $shadow-main;
  padding: 10px 12px;
  &__logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: $gray-200;
    margin-right: 12px;
    &--main { background: linear-gradient(135deg, #2a7cff 0%, #00c48c 100%); }
    &--aggr { background: linear-gradient(135deg, #ff4d4f 0%, #2a7cff 100%); }
  }
  &__info {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  &__name {
    font-size: 15px;
    font-weight: 600;
    color: $gray-900;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  &__badge {
    font-size: 12px;
    background: $gray-100;
    color: $gray-700;
    border-radius: 8px;
    padding: 2px 6px;
    margin-left: 4px;
    font-weight: 500;
  }
  &__sum {
    font-size: 14px;
    color: $gray-700;
    font-weight: 500;
    margin-top: 2px;
  }
  &__growth {
    font-size: 13px;
    font-weight: 500;
    margin-left: 8px;
    &--green { color: #1bc47d; }
    &--red { color: #ff4d4f; }
  }
}
</style> 