<template>
  <div class="asset-item">
    <div class="asset-item__icon">
      <img
        :src="getIconPath(asset.logo)"
        :alt="asset.bank"
        class="asset-item__icon-img"
      />
    </div>
    <div class="asset-item__content">
      <div class="asset-item__name">{{ asset.bank }}</div>
      <div class="asset-item__details">
        <span class="asset-item__count">{{ asset.count }} шт</span>
        <span class="asset-item__dot"></span>
        <span class="asset-item__price">{{ formattedPrice }}</span>
      </div>
    </div>
    <div class="asset-item__right">
      <div class="asset-item__amount">{{ formattedAmount }}</div>
      <div class="asset-item__profit" :class="profitClass">
        <span class="asset-item__profit-arrow">
          <svg v-if="asset.profit < 0" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M8 13l-4-4m4 4l4-4" :stroke="$colorError" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 13V3M8 3l-4 4m4-4l4 4" :stroke="$colorSuccess" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
        <span class="asset-item__profit-percent">{{ profitSign }}{{ formattedPercent }}%</span>
        <span class="asset-item__dot asset-item__dot--profit"></span>
        <span class="asset-item__profit-value">{{ profitSign }}{{ formattedProfit }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  asset: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        value &&
        typeof value.bank === 'string' &&
        typeof value.amount === 'number' &&
        typeof value.count === 'number' &&
        typeof value.price === 'number' &&
        typeof value.percent === 'number' &&
        typeof value.profit === 'number'
      )
    }
  }
})

const formattedAmount = computed(() => {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(props.asset.amount) + ' ₽'
})

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(props.asset.price) + ' ₽'
})

const formattedProfit = computed(() => {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Math.abs(props.asset.profit))
})

const formattedPercent = computed(() => {
  return Math.abs(props.asset.percent)
})

const profitClass = computed(() => {
  return props.asset.profit >= 0 ? 'asset-item__profit--positive' : 'asset-item__profit--negative'
})

const profitSign = computed(() => {
  return props.asset.profit >= 0 ? '+' : '-'
})

const getIconPath = (icon) => {
  return new URL(`../../assets/icons/coins/${icon}.svg`, import.meta.url).href
}
</script>

<style lang="scss" scoped>
@import '@/styles/_variables';

.asset-item {
  display: flex;
  align-items: center;
  padding: 12px 0px;
  min-height: 70px;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: $space-l;
    right: $space-l;
    height: 1px;
    background: $gray-200;
  }
}

.asset-item__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: $space-m;
}

.asset-item__icon-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.asset-item__content {
  flex: 1;
  min-width: 0;
}

.asset-item__name {
  font-family: $font-main;
  font-size: $font-size-body;
  font-weight: $font-weight-medium;
  line-height: 22px;
  color: $gray-950;
  margin-bottom: 2px;
}

.asset-item__details {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  font-family: $font-main;
  font-size: $font-size-small;
  font-weight: $font-weight-regular;
  line-height: 20px;
  color: $gray-500;
}

.asset-item__count, .asset-item__price {
  font-family: $font-main;
  font-size: $font-size-small;
  font-weight: $font-weight-regular;
  line-height: 20px;
  color: $gray-500;
}

.asset-item__dot {
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: $gray-200;
  display: inline-block;
}

.asset-item__right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.asset-item__amount {
  font-family: $font-main;
  font-size: $font-size-body;
  font-weight: $font-weight-medium;
  line-height: 22px;
  color: $gray-950;
  margin-bottom: 2px;
}

.asset-item__profit {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  font-family: $font-main;
  font-size: $font-size-small;
  font-weight: $font-weight-regular;
  line-height: 20px;

  &--positive {
    color: $color-success;
    .asset-item__profit-arrow svg path { stroke: $color-success; }
    .asset-item__dot--profit { background: $color-success; }
    .asset-item__profit-percent, .asset-item__profit-value { color: $color-success; }
  }

  &--negative {
    color: $color-error;
    .asset-item__profit-arrow svg path { stroke: $color-error; }
    .asset-item__dot--profit { background: $color-error; }
    .asset-item__profit-percent, .asset-item__profit-value { color: $color-error; }
  }
}

.asset-item__profit-arrow {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.asset-item__profit-percent, .asset-item__profit-value {
  font-family: $font-main;
  font-size: $font-size-small;
  font-weight: $font-weight-regular;
  line-height: 20px;
}

.asset-item__dot--profit {
  width: 2px;
  height: 2px;
  border-radius: 50%;
  display: inline-block;
}

@media (max-width: 480px) {
  .asset-item {
    padding: 12px 12px;
    min-height: 60px;
  }
  
  .asset-item__icon-img {
    width: 36px;
    height: 36px;
  }
}
</style> 