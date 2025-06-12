<template>
  <svg 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
  >
    <circle 
      cx="8" 
      cy="8" 
      r="7" 
      stroke="currentColor" 
      stroke-width="1.5"
      fill="none"
    />
    <path 
      d="M8 11V7M8 5V5.01" 
      stroke="currentColor" 
      stroke-width="1.5" 
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup>
defineProps({
  width: {
    type: [String, Number],
    default: 16
  },
  height: {
    type: [String, Number], 
    default: 16
  }
});
</script> 