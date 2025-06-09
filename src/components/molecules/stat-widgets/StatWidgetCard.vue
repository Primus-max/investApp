<template>
  <div class="stat-widget-card">
    <div class="stat-widget-card__title">{{ title }}</div>
    <div :class="['stat-widget-card__content', positive ? 'stat-widget-card__content--positive' : 'stat-widget-card__content--negative']">
      <LineChartAtom
        class="stat-widget-card__chart-bg"
        :data="chartData"
        :positive="positive"
        :color="positive ? '#3CB46E' : '#F04438'"
        :width="167"
        :height="120"
      />
      <div class="stat-widget-card__info">
        <div class="stat-widget-card__value-row">
          <span :class="['stat-widget-card__sign', positive ? 'stat-widget-card__sign--positive' : 'stat-widget-card__sign--negative']">
            {{ positive ? '+' : '-' }}
          </span>
          <span class="stat-widget-card__value">{{ value }}</span>
          <span class="stat-widget-card__currency">₽</span>
        </div>
        <div class="stat-widget-card__percent-row">
          <span :class="['stat-widget-card__percent', positive ? 'stat-widget-card__percent--positive' : 'stat-widget-card__percent--negative']">
            {{ percent }}%
          </span>
          <span :class="['stat-widget-card__arrow', positive ? 'stat-widget-card__arrow--positive' : 'stat-widget-card__arrow--negative']">
            <template v-if="positive">↑</template>
            <template v-else>↓</template>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LineChartAtom from '@/components/atoms/LineChartAtom.vue';

const props = defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
  percent: { type: [String, Number], required: true },
  positive: { type: Boolean, required: true },
  chartData: { type: Array, default: () => [] },
});
</script>

<style scoped lang="scss">
.stat-widget-card {
  width: 175px;
  height: 166px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.04);
  padding: 12px 12px 0 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.stat-widget-card__title {
  font-family: 'SF Pro Rounded', 'SF Pro Display', Arial, sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #434956;
  margin-bottom: 8px;
}
.stat-widget-card__content {
  width: 100%;
  height: 120px;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  &--positive {
    background: linear-gradient(180deg, #E9F9F1 0%, #F6FBF8 100%);
  }
  &--negative {
    background: linear-gradient(180deg, #FDEEEE 0%, #FCF6F6 100%);
  }
}
.stat-widget-card__chart-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}
.stat-widget-card__info {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.stat-widget-card__value-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 32px;
  font-weight: 700;
}
.stat-widget-card__sign {
  font-size: 32px;
  font-weight: 700;
  &--positive {
    color: #3CB46E;
  }
  &--negative {
    color: #F04438;
  }
}
.stat-widget-card__value {
  font-size: 32px;
  font-weight: 700;
  color: #181818;
}
.stat-widget-card__currency {
  font-size: 20px;
  color: #596173;
  font-weight: 600;
}
.stat-widget-card__percent-row {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  margin-top: 2px;
  justify-content: center;
}
.stat-widget-card__percent {
  font-weight: 600;
  &--positive {
    color: #3CB46E;
  }
  &--negative {
    color: #F04438;
  }
}
.stat-widget-card__arrow {
  font-size: 16px;
  font-weight: 700;
  &--positive {
    color: #3CB46E;
  }
  &--negative {
    color: #F04438;
  }
}
</style> 