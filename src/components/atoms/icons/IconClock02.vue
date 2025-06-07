<template>
  <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16.5" cy="16" r="14" :fill="color || '#007BFF'" />
    <path d="M9.87649 13.5177C11.136 10.1934 14.7521 8.29998 18.2777 9.24136C22.0328 10.244 24.2633 14.0828 23.2596 17.8155C22.2559 21.5482 18.3981 23.7614 14.643 22.7587C11.8549 22.0143 9.90734 19.7063 9.5 17.0391M9.87649 13.5177L13.5 13M9.87649 13.5177L8.5 10.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>
<script setup>
const props = defineProps({ color: String })
</script> 