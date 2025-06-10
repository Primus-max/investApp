<template>
  <div class="stat-widget">
    <div class="stat-widget__title">{{ title }}</div>
    <div :class="['stat-widget__content', positive ? 'stat-widget__content--positive' : 'stat-widget__content--negative']">
      <div class="stat-widget__info">
        <div class="stat-widget__value-row">
          <span :class="['stat-widget__sign', positive ? 'stat-widget__sign--positive' : 'stat-widget__sign--negative']">
            {{ positive ? '+' : '-' }}
          </span>
          <span class="stat-widget__value">{{ value }}</span>
          <span class="stat-widget__currency">₽</span>
        </div>
        <div class="stat-widget__percent-row">
          <span :class="['stat-widget__percent', positive ? 'stat-widget__percent--positive' : 'stat-widget__percent--negative']">
            {{ percent }}%
          </span>
          <span :class="['stat-widget__arrow', positive ? 'stat-widget__arrow--positive' : 'stat-widget__arrow--negative']">
            <template v-if="positive">↑</template>
            <template v-else>↓</template>
          </span>
        </div>
      </div>
      <div class="stat-widget__chart">
        <svg width="100%" height="56" viewBox="0 0 140 56">
          <polyline :points="chartPoints" :stroke="positive ? '#3CB46E' : '#F04438'" fill="none" stroke-width="2" />
          <line x1="0" :y1="midY" x2="140" :y2="midY" :stroke="positive ? '#3CB46E' : '#F04438'" stroke-dasharray="4 4" stroke-width="1" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
  percent: { type: [String, Number], required: true },
  positive: { type: Boolean, required: true },
  chartData: { type: Array, default: () => [] },
});

const chartPoints = computed(() => {
  if (!props.chartData.length) return '';
  const max = Math.max(...props.chartData);
  const min = Math.min(...props.chartData);
  const range = max - min || 1;
  return props.chartData.map((v, i) => {
    const x = (i / (props.chartData.length - 1)) * 140;
    const y = 54 - ((v - min) / range) * 48 - 2;
    return `${x},${y}`;
  }).join(' ');
});

const midY = 54 - 24;
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.stat-widget {
  width: 175px;
  height: 166px;
  border-radius: $radius-xl;
  background: $gray-0;
  box-shadow: $shadow-main;
  padding: 12px 12px 0 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.stat-widget__title {
  font-family: 'SF Pro Rounded', 'SF Pro Display', Arial, sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #434956;
  margin-bottom: 8px;
}
.stat-widget__content {
  width: 100%;
  height: 120px;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 8px 0 8px;
  position: relative;
  &--positive {
    background: linear-gradient(180deg, #E9F9F1 0%, #F6FBF8 100%);
  }
  &--negative {
    background: linear-gradient(180deg, #FDEEEE 0%, #FCF6F6 100%);
  }
}
.stat-widget__info {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  height: 100%;
  padding-bottom: 12px;
}
.stat-widget__value-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 32px;
  font-weight: 700;
}
.stat-widget__sign {
  font-size: 32px;
  font-weight: 700;
  &--positive {
    color: #3CB46E;
  }
  &--negative {
    color: #F04438;
  }
}
.stat-widget__value {
  font-size: 32px;
  font-weight: 700;
  color: #181818;
}
.stat-widget__currency {
  font-size: 20px;
  color: #596173;
  font-weight: 600;
}
.stat-widget__percent-row {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  margin-top: 2px;
}
.stat-widget__percent {
  font-weight: 600;
  &--positive {
    color: #3CB46E;
  }
  &--negative {
    color: #F04438;
  }
}
.stat-widget__arrow {
  font-size: 16px;
  font-weight: 700;
  &--positive {
    color: #3CB46E;
  }
  &--negative {
    color: #F04438;
  }
}
.stat-widget__chart {
  width: 90px;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding-bottom: 8px;
}
</style> 