<template>
  <button
    class="app-button app-button_type_{{ type }} app-button_size_{{ size }}"
    :class="{
      'is-loading': loading,
      'is-disabled': disabled,
      'app-button_round': round
    }"
    :disabled="disabled || loading"
    @mousedown="pressed = true"
    @mouseup="pressed = false"
    @mouseleave="pressed = false"
  >
    <span v-if="loading" class="app-button__loader">
      <AppIcon name="loading" type="sprite" />
    </span>
    <span v-else class="app-button__icon">
      <slot name="icon" />
    </span>
    <span class="app-button__label">
      <slot />
    </span>
  </button>
</template>

<script setup>
import { ref } from 'vue';

import AppIcon from '@/components/atoms/AppIcon.vue';

const props = defineProps({
  type: { type: String, default: 'fill' }, // fill, bezeled, gray, white, negative, text
  size: { type: String, default: 'medium' }, // small, medium, large
  round: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})
const pressed = ref(false)
</script>

<style scoped lang="scss">
@import '@/styles/atoms/app-button.scss';
</style> 