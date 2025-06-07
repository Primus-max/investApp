<template>
  <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16.5" cy="16" r="14" :fill="color || '#007BFF'" />
    <path d="M12.8025 19.6975L20.5 12M12.8025 19.6975C13.4762 20.3713 16.6539 19.7112 17.6134 19.6975M12.8025 19.6975C12.1287 19.0238 12.7889 15.8461 12.8025 14.8866" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>
<script setup>
const props = defineProps({ color: String })
</script> 