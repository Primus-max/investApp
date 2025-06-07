<template>
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="44" height="44" rx="12" fill="#fff"/>
    <g>
      <template v-if="!isActive">
        <rect x="20" y="12" width="4" height="20" rx="2" fill="#16181D"/>
        <rect x="12" y="20" width="20" height="4" rx="2" fill="#16181D"/>
      </template>
      <template v-else>
        <rect x="20" y="12" width="4" height="20" rx="2" :transform="'rotate(45 22 22)'" fill="#16181D"/>
        <rect x="20" y="12" width="4" height="20" rx="2" :transform="'rotate(135 22 22)'" fill="#16181D"/>
      </template>
    </g>
  </svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  active: Boolean,
  name: String
})

const isActive = computed(() => props.active || props.name === 'close-square')
</script>