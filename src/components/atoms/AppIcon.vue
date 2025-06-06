<template>
  <component v-if="type === 'component' && iconComponent" :is="iconComponent" class="app-icon" />
  <svg v-else-if="type === 'sprite' && name" class="app-icon">
    <use :xlink:href="`#${name}`" />
  </svg>
</template>

<script setup>
import { computed } from 'vue';

// Импортируем SVG-иконки (добавим реальные файлы после экспорта из Figma)
import BtcIcon from '@/assets/icons/btc.svg';
import EthIcon from '@/assets/icons/eth.svg';

// ...другие импорты по мере добавления

const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, default: 'sprite' } // 'sprite' или 'component'
})

const icons = {
  btc: BtcIcon,
  eth: EthIcon,
  // ...другие иконки
}

const iconComponent = computed(() => icons[props.name] || null)
</script>

<style scoped lang="scss">
.app-icon {
  width: 32px;
  height: 32px;
  display: inline-block;
  vertical-align: middle;
  fill: currentColor;
}
</style> 