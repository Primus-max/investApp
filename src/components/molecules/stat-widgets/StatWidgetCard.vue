<template>
  <div class="stat-widget-card">
    <div v-if="editMode" class="stat-widget-card__remove">
      <IconMinus />
    </div>
    <div class="stat-widget-card__title">{{ title }}</div>
    <div
      :class="['stat-widget-card__content', positive ? 'stat-widget-card__content--positive' : 'stat-widget-card__content--negative']">
      <div
        :class="['stat-widget-card__chart-bg', positive ? 'stat-widget-card__chart-bg--positive' : 'stat-widget-card__chart-bg--negative']">
        <LineChartAtom :data="chartData" :positive="positive" :color="positive ? '#3CB46E' : '#F04438'" :width="167"
          :height="120" />
      </div>
      <!-- <div class="stat-widget-card__info">
        <div class="stat-widget-card__value-row">
          <span
            :class="['stat-widget-card__sign', positive ? 'stat-widget-card__sign--positive' : 'stat-widget-card__sign--negative']">
            {{ positive ? '+' : '-' }}
          </span>
          <span class="stat-widget-card__value">{{ value }}</span>
          <span class="stat-widget-card__currency">₽</span>
        </div>
        <div class="stat-widget-card__percent-row">
          <span
            :class="['stat-widget-card__percent', positive ? 'stat-widget-card__percent--positive' : 'stat-widget-card__percent--negative']">
            {{ percent }}%
          </span>
          <span
            :class="['stat-widget-card__arrow', positive ? 'stat-widget-card__arrow--positive' : 'stat-widget-card__arrow--negative']">
            <template v-if="positive">↑</template>
            <template v-else>↓</template>
          </span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
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
}

.stat-widget-card__title {
  font-family: 'SF Pro Rounded', 'SF Pro Display', Arial, sans-serif;
  font-weight: 600;
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
}

.stat-widget-card__chart-bg {
  // position: absolute;
  // left: 8px;
  // top: 24px;
  width: calc(100% - 16px);
  height: 50%;
  border-radius: $radius-lg;
  z-index: 1;
  pointer-events: none;

  // &--positive {
  //   background: linear-gradient(180deg, rgba($color-success, 0.12) 0%, rgba($color-success, 0.04) 100%);
  // }

  // &--negative {
  //   background: linear-gradient(180deg, rgba($color-error, 0.12) 0%, rgba($color-error, 0.04) 100%);
  // }
}

.stat-widget-card__info {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
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
  color: $color-error;
  background: $gray-0;
  border-radius: 50%;
  box-shadow: $shadow-main;
  z-index: 10;
}
</style>