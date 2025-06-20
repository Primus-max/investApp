<template>
  <div class="portfolio-card" @click="handleClick">
    <div class="portfolio-card__icons">
      <template v-if="icons.length <= 3">
        <img
          v-for="(icon, idx) in icons"
          :key="idx"
          :src="getIconPath(icon)"
          :alt="icon"
          class="portfolio-card__icon"
          :style="{ left: `${idx * 26}px`, zIndex: idx + 1 }"
        />
      </template>
      <template v-else>
        <img
          v-for="(icon, idx) in icons.slice(0, 2)"
          :key="idx"
          :src="getIconPath(icon)"
          :alt="icon"
          class="portfolio-card__icon"
          :style="{ left: `${idx * 26}px`, zIndex: idx + 1 }"
        />
        <div
          class="portfolio-card__icon portfolio-card__icon--more"
          :style="{ left: `${2 * 26}px`, zIndex: 3 }"
        >
          +{{ icons.length - 2 }}
        </div>
      </template>
    </div>
    <div class="portfolio-card__content">
      <div class="portfolio-card__title">{{ portfolio.name }}</div>
      <div class="portfolio-card__row">
        <span class="portfolio-card__amount">{{ formattedAmount }}</span>
        <span v-if="hasProfit" :class="['portfolio-card__profit', profitClass]">
          {{ profitSign }}{{ formattedProfit }} <span class="portfolio-card__dot">·</span> {{ formattedPercent }}% <span class="portfolio-card__arrow">{{ profitArrow }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import { useRouter } from 'vue-router';

const props = defineProps({
  portfolio: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        value &&
        typeof value.name === 'string' &&
        typeof value.amount === 'number' &&
        Array.isArray(value.icons)
      )
    }
  }
})

const router = useRouter()

const icons = computed(() => props.portfolio.icons || [])

const formattedAmount = computed(() => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 2
  }).format(props.portfolio.amount)
})

const hasProfit = computed(() =>
  typeof props.portfolio.profit === 'number' && typeof props.portfolio.percent === 'number'
)

const formattedProfit = computed(() => {
  if (!hasProfit.value) return ''
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Math.abs(props.portfolio.profit))
})

const formattedPercent = computed(() => {
  if (!hasProfit.value) return ''
  return Math.abs(props.portfolio.percent).toFixed(0)
})

const profitClass = computed(() => {
  if (!hasProfit.value) return ''
  return props.portfolio.profit >= 0 ? 'portfolio-card__profit--positive' : 'portfolio-card__profit--negative'
})

const profitSign = computed(() => {
  if (!hasProfit.value) return ''
  return props.portfolio.profit >= 0 ? '+' : '-'
})

const profitArrow = computed(() => {
  if (!hasProfit.value) return ''
  return props.portfolio.profit >= 0 ? '↑' : '↓'
})

const getIconPath = (icon) => {
  return new URL(`../../assets/icons/coins/${icon}.svg`, import.meta.url).href
}

const handleClick = () => {
  router.push(`/portfolio/${props.portfolio.id}`)
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';

.portfolio-card {
  display: flex;
  align-items: center;
  background: $gray-0;
  border-radius: $radius-xl;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.06);
  padding: $space-m $space-l;
  cursor: pointer;
  min-height: 74px;
  transition: box-shadow 0.2s, border 0.2s;
  border: 2px solid transparent;
  &:hover {
    box-shadow: 0 4px 16px rgba(44, 62, 80, 0.10);
    border-color: $primary-100;
  }
}

.portfolio-card__icons {
  display: flex;
  align-items: center;
  position: relative;
  min-width: 80px;
  margin-right: $space-m;
  height: 38px;
}

.portfolio-card__icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: $gray-0;
  object-fit: cover;
  box-shadow: 0 1px 4px rgba(44, 62, 80, 0.04);
  position: absolute;
  top: 0;
  left: 0;
  border: 2px solid $gray-0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: $font-weight-semibold;
  color: $gray-700;
  transition: left 0.15s;
}

.portfolio-card__icon--more {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: $gray-100;
  color: $gray-700;
  border: 2px solid $gray-0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: $font-weight-semibold;
  box-shadow: 0 1px 4px rgba(44, 62, 80, 0.04);
  transition: left 0.15s;
}

.portfolio-card__content {
  flex: 1;
  min-width: 0;
}

.portfolio-card__title {
  font-family: $font-main;
  font-size: $font-size-h3;
  font-weight: $font-weight-semibold;
  color: $gray-900;
  line-height: $line-height-h3;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.portfolio-card__row {
  display: flex;
  align-items: center;
  gap: $space-s;
  min-height: $line-height-body * 1em;
}

.portfolio-card__amount {
  font-family: $font-main;
  font-size: $font-size-body;
  font-weight: $font-weight-medium;
  color: $gray-800;
  line-height: $line-height-body;
}

.portfolio-card__profit {
  font-family: $font-main;
  font-size: $font-size-caption;
  font-weight: $font-weight-regular;
  display: flex;
  align-items: center;
  gap: $space-xs;
  line-height: $line-height-caption;
}

.portfolio-card__profit--positive {
  color: $color-success;
}

.portfolio-card__profit--negative {
  color: $color-error;
}

.portfolio-card__dot {
  width: 2px;
  height: 2px;
  background: $color-success;
  border-radius: 50%;
  display: inline-block;
  margin: 0 $space-xs;
}

.portfolio-card__arrow {
  font-size: $font-size-caption;
  font-weight: $font-weight-medium;
  margin-left: 2px;
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 480px) {
  .portfolio-card {
    padding: $space-s $space-m;
    min-height: 56px;
  }
  .portfolio-card__icon {
    width: 38px;
    height: 38px;
  }
  .portfolio-card__amount {
    font-size: $font-size-body;
  }
}
</style> 