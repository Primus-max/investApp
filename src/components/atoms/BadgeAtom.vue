<template>
    <span class="badge-atom" :class="[{ 'badge-atom--disabled': disabled }, customClass]">
      <slot />
    </span>
  </template>
  
  <script setup>
defineProps({
    customClass: { type: [String, Array, Object], default: '' },
    disabled: { type: Boolean, default: false }
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
  
  .badge-atom--disabled {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 16px;
    gap: 6px;
    background: #F1F2F4;
    opacity: 0.4;
    border-radius: 16px;
    font-family: 'SF Pro Rounded', $font-main, sans-serif;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: #434956;
  }
  </style>