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
        {{ asset.count }} шт {{ formattedPrice }}
      </div>
    </div>
    <div class="asset-item__right">
      <div class="asset-item__amount">{{ formattedAmount }}</div>
      <div class="asset-item__profit" :class="profitClass">
        {{ profitSign }} {{ formattedPercent }}% • {{ profitSign }}{{ formattedProfit }}
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
  padding: $space-m $space-l;
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
  font-size: $font-size-h3;
  font-weight: $font-weight-semibold;
  color: $gray-900;
  line-height: $line-height-h3;
  margin-bottom: 2px;
}

.asset-item__details {
  font-family: $font-main;
  font-size: $font-size-caption;
  font-weight: $font-weight-regular;
  color: $gray-700;
  line-height: $line-height-caption;
}

.asset-item__right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.asset-item__amount {
  font-family: $font-main;
  font-size: $font-size-h3;
  font-weight: $font-weight-semibold;
  color: $gray-900;
  line-height: $line-height-h3;
  margin-bottom: 2px;
}

.asset-item__profit {
  font-family: $font-main;
  font-size: $font-size-caption;
  font-weight: $font-weight-regular;
  line-height: $line-height-caption;

  &--positive {
    color: $color-success;
  }

  &--negative {
    color: $color-error;
  }
}

@media (max-width: 480px) {
  .asset-item {
    padding: $space-s $space-m;
    min-height: 60px;
  }
  
  .asset-item__icon-img {
    width: 36px;
    height: 36px;
  }
}
</style> 