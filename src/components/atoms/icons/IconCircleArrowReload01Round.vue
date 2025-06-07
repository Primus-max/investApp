<template>
  <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16.5" cy="16" r="14" :fill="color || '#007BFF'" />
    <path d="M22.5 13.4286H11.9216C11.0595 13.4286 10.6285 13.4286 10.5212 13.164C10.4139 12.8995 10.7187 12.5881 11.3283 11.9654L13.2522 10M10.5 18.5715H21.0784C21.9405 18.5715 22.3715 18.5715 22.4788 18.836C22.5861 19.1006 22.2813 19.412 21.6717 20.0347L19.7478 22" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>
<script setup>
const props = defineProps({ color: String })
</script> 