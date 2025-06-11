<template>
  <section class="capital-mesh-gradient">
    <div class="mesh-bg">
      <div class="ellipse-13"></div>
      <div class="ellipse-14"></div>
      <div class="vector-11"></div>
      <div class="shadow"></div>
      <div class="waves-back"></div>
    </div>
    <div class="capital-card">
      <div class="capital-card__title">Общий капитал</div>
      <div class="capital-card__row capital-card__row--main">
        <span class="capital-card__balance">267 981</span>
        <span class="capital-card__currency">₽</span>
      </div>
      <div class="capital-card__row capital-card__row--growth">
        <div class="capital-card__growth-bg">
          <span class="capital-card__growth">+ 27 861,33 ₽ (18,44%)</span>
          <span class="capital-card__period">за все время</span>
        </div>
      </div>
      <button class="capital-card__notif">
        <AppIcon name="notif" />
      </button>
    </div>
  </section>
</template>
<script setup>
import AppIcon from '@/components/atoms/AppIcon.vue';
import '@/assets/mesh-dark-gradient-07.scss';
</script>
<style scoped lang="scss">
.capital-mesh-gradient {
  position: relative;
  width: 390px;
  height: 338px;
  left: 0;
  top: 68px;
}

.capital-card {
  position: absolute;
  width: 358px;
  height: 114px;
  left: 50%;
  top: 94px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 4px;
  z-index: 2;
}
.capital-card__title {
  width: 358px;
  height: 24px;
  font-family: 'SF Pro Rounded', 'SF Pro Display', Arial, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #fff;
}
.capital-card__row {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 4px;
}
.capital-card__row--main {
  width: 165px;
  height: 48px;
}
.capital-card__balance {
  width: 147px;
  height: 48px;
  font-family: 'SF Pro Rounded', 'SF Pro Display', Arial, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 48px;
  color: #fff;
}
.capital-card__currency {
  width: 14px;
  height: 28px;
  font-family: 'SF Pro Rounded', 'SF Pro Display', Arial, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 28px;
  color: #fff;
}
.capital-card__row--growth {
  width: 285px;
  height: 34px;
  align-items: center;
  margin-top: 4px;
}
.capital-card__growth-bg {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 12px;
  gap: 10px;
  width: 186px;
  height: 34px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border-radius: 10000px;
}
.capital-card__growth {
  width: 162px;
  height: 22px;
  font-family: 'SF Pro Rounded', 'SF Pro Display', Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #fff;
}
.capital-card__period {
  width: 91px;
  height: 22px;
  font-family: 'SF Pro Rounded', 'SF Pro Display', Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #fff;
  opacity: 0.8;
}
.capital-card__notif {
  position: absolute;
  width: 48px;
  height: 48px;
  left: 326px;
  top: 94px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10000px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  z-index: 3;
}
</style> 