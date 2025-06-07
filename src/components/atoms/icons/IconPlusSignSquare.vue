<template>
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="44" height="44" rx="12" fill="#fff"/>
    <g>
      <template v-if="!active">
        <rect x="20" y="12" width="4" height="20" rx="2" fill="#16181D"/>
        <rect x="12" y="20" width="20" height="4" rx="2" fill="#16181D"/>
      </template>
      <template v-else>
        <rect x="14.343" y="12.222" width="4" height="28" rx="2" :transform="'rotate(45 14.343 12.222)'" fill="#16181D"/>
        <rect x="29.657" y="12.222" width="4" height="28" rx="2" :transform="'rotate(135 29.657 12.222)'" fill="#16181D"/>
      </template>
    </g>
  </svg>
</template>

<script setup>
const props = defineProps({
  active: Boolean
})
</script>