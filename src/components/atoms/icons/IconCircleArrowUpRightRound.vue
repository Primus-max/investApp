<template>
  <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16.5" cy="16" r="14" :fill="color || '#007BFF'" />
    <path d="M20.6597 11.3403L12 20M20.6597 11.3403C19.9017 10.5823 16.3268 11.325 15.2474 11.3403M20.6597 11.3403C21.4177 12.0983 20.675 15.6732 20.6597 16.7526" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>
<script setup>
const props = defineProps({ color: String })
</script> 