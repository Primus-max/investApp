<template>
    <span class="badge-atom" :class="customClass">
      <slot />
    </span>
  </template>
  
  <script setup>
defineProps({
    customClass: { type: [String, Array, Object], default: '' }
  });
</script>
  
  <style scoped lang="scss">
  @import '@/styles/_variables.scss';
  
  .badge-atom {
    display: inline-flex;
    align-items: center;
    font-family: $font-main;
    font-size: $font-size-caption;
    font-weight: $font-weight-medium;
    line-height: $line-height-caption;
    border-radius: $radius-lg;
    padding: 0 $space-s;
  }
  </style>