<template>
  <div class="stat-widget-card">
    <div v-if="editMode" class="stat-widget-card__remove">
      <IconMinus />
    </div>
    <div class="stat-widget-card__title">{{ title }}</div>
    <div
      :class="['stat-widget-card__content', positive && !isNotData ? 'stat-widget-card__content--positive' : 'stat-widget-card__content--negative', isNotData ? 'stat-widget-card__content--empty' : '']">
      <div
        :class="['stat-widget-card__chart-bg', positive && !isNotData ? 'stat-widget-card__chart-bg--positive' : 'stat-widget-card__chart-bg--negative', isNotData ? 'stat-widget-card__chart-bg--empty' : '']">
        <IconEmptyStat v-if="isNotData" />
        <LineChartAtom v-else :data="chartData" :positive="positive" :color="positive ? '#3CB46E' : '#F04438'"
          :width="167" :height="120" />
      </div>
      <div class="stat-widget-card__info">
        <div class="stat-widget-card__value-row">
          <span v-if="!isNotData"
            :class="['stat-widget-card__sign', positive ? 'stat-widget-card__sign--positive' : 'stat-widget-card__sign--negative']">
            {{ positive ? '+' : '-' }}
          </span>
          <span class="stat-widget-card__value">{{ isNotData ? 0 : value }}</span>
          <span class="stat-widget-card__currency">₽</span>
        </div>
        <div class="stat-widget-card__percent-row">
          <span v-if="!isNotData"
            :class="['stat-widget-card__percent', positive && !isNotData ? 'stat-widget-card__percent--positive' : 'stat-widget-card__percent--negative']">
            {{ percent }}%
          </span>
          <span v-if="!isNotData"
            :class="['stat-widget-card__arrow', positive ? 'stat-widget-card__arrow--positive' : 'stat-widget-card__arrow--negative']">
            <template v-if="positive && !isNotData">↑</template>
            <template v-else>↓</template>
          </span>
        </div>
      </div>
      <!-- <div v-else class="stat-widget-card__info">0 <span class="stat-widget-card__currency">₽</span></div> -->
      <div v-if="isNotData" class="stat-widget-card__empty-center">
        <div class="stat-widget-card__empty-badge">Нет данных</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import IconEmptyStat from '@/components/atoms/icons/IconEmptyStat.vue';
import IconMinus from '@/components/atoms/icons/IconMinus.vue';
import LineChartAtom from '@/components/atoms/stats/LineChartAtom.vue';

const props = defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
  percent: { type: [String, Number], required: true },
  positive: { type: Boolean, required: true },
  chartData: { type: Array, default: () => [] },
  editMode: Boolean,
});

const isNotData = computed(() => {
  return false;
  // const valEmpty = !props.value || props.value === 0;
  // const percentEmpty = !props.percent || props.percent === 0;
  // const chartEmpty = !props.chartData || props.chartData.length === 0;
  // return valEmpty && percentEmpty && chartEmpty;
});
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.stat-widget-card {
  width: 100%;
  min-height: 166px;
  border-radius: $radius-xl;
  background: $gray-0;
  box-shadow: $shadow-main;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 4px
}

.stat-widget-card__title {
  font-family: 'SF Pro Rounded', 'SF Pro Display', Arial, sans-serif;
  font-weight: $font-weight-medium;
  font-size: 18px;
  line-height: 24px;
  color: #434956;
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  z-index: 3;
}

.stat-widget-card__content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  position: relative;
  border-radius: $radius-xl;
  overflow: hidden;
  align-items: flex-end;
}

.stat-widget-card__chart-bg {
  height: 70%;
  border-radius: $radius-lg;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;

  &--positive {
    background: linear-gradient(180deg, rgba($color-success, 0.12) 0%, rgba($color-success, 0.04) 100%);
  }

  &--negative {
    background: linear-gradient(180deg, rgba($color-error, 0.12) 0%, rgba($color-error, 0.04) 100%);
  }
}

.stat-widget-card__info {
  position: absolute;
  left: 10px;
  right: 16px;
  bottom: 58px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.stat-widget-card__value-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 4px;
}

.stat-widget-card__sign {
  font-size: 28px;
  font-weight: 700;
  line-height: 1;

  &--positive {
    color: #3CB46E;
  }

  &--negative {
    color: #F04438;
  }
}

.stat-widget-card__value {
  font-size: 28px;
  font-weight: 700;
  color: #181818;
  line-height: 1;
}

.stat-widget-card__currency {
  font-size: 18px;
  color: #596173;
  font-weight: 600;
  line-height: 1;
}

.stat-widget-card__percent-row {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-start;
}

.stat-widget-card__percent {
  font-weight: 600;
  font-size: 16px;
  line-height: 1;

  &--positive {
    color: #3CB46E;
  }

  &--negative {
    color: #F04438;
  }

  &--empty {
    color: $gray-400;
  }
}

.stat-widget-card__arrow {
  font-size: 16px;
  font-weight: 700;
  line-height: 1;

  &--positive {
    color: #3CB46E;
  }

  &--negative {
    color: #F04438;
  }
}

.stat-widget-card__remove {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: $gray-50;
  background: $gray-50;
  border-radius: 50%;
  box-shadow: $shadow-main;
  z-index: 10;
}

.stat-widget-card__empty-center {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 3;
}

.stat-widget-card__empty-badge {
  background: #FFFFFF;
  color: #16181D;
  font-size: 14px;
  font-weight: 500;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 4px 11px;
  margin-top: 34%;
  text-align: center;
  display: inline-block;
}

// .stat-widget-card__content--empty { 
//   background: $color-bg-main !important;
// }
.stat-widget-card__chart-bg--empty {
  height: 68%;
  background: $color-bg-main !important;
}
</style>