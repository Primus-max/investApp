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
      <img src="@/assets/icons/loader.svg" alt="loader" class="app-button__loader-svg" />
    </span>
    <span v-else class="app-button__label">
      <slot />
    </span>
    <span v-if="!loading" class="app-button__icon">
      <slot name="icon" />
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
@import '@/styles/_variables.scss';

.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  font-family: $font-main;
  font-weight: $font-weight-bold;
  border-radius: $radius-xl;
  transition: background 0.15s, color 0.15s, box-shadow 0.15s;
  user-select: none;
  -webkit-user-select: none;
  position: relative;
  padding: 0 $space-l;
  height: 56px;
  min-width: 120px;
  font-size: 18px;
  line-height: 1.2;
  background: $primary-500;
  color: $gray-0;
  box-shadow: $shadow-main;
  letter-spacing: $letter-spacing-normal;

  &__icon {
    display: inline-flex;
    align-items: center;
    margin-left: $space-s;
    margin-right: 0;
    font-size: 22px;
    line-height: 1;
    order: 2;
    svg, img {
      width: 22px;
      height: 22px;
      display: block;
    }
  }

  &__label {
    display: inline-block;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
    font-weight: $font-weight-bold;
    letter-spacing: $letter-spacing-normal;
    order: 1;
  }

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    background: transparent;
    .app-button__loader-svg {
      width: 25px;
      height: 24px;
      animation: spin 1s linear infinite;
    }
  }

  &.is-loading {
    .app-button__label,
    .app-button__icon {
      opacity: 0;
      pointer-events: none;
    }
  }

  // Состояния
    &:hover:not(:disabled):not(.is-loading) {
    background: $primary-400;
    }
    &:active:not(:disabled):not(.is-loading) {
    background: $primary-600;
    }
    &.is-disabled,
    &:disabled {
    background: $gray-200;
    color: $gray-400;
      cursor: not-allowed;
      opacity: 0.6;
  }

  // Размеры
  &_size_small {
    height: 40px;
    font-size: 15px;
    padding: 0 $space-m;
    border-radius: $radius-sm;
    .app-button__icon, .app-button__loader {
      svg, img { width: 16px; height: 16px; }
    }
  }
  &_size_medium {
    height: 48px;
    font-size: 16px;
    padding: 0 $space-l;
    border-radius: $radius-md;
    .app-button__icon, .app-button__loader {
      svg, img { width: 20px; height: 20px; }
    }
  }
  &_size_large {
    height: 56px;
    font-size: 18px;
    padding: 0 $space-xl;
    border-radius: $radius-xl;
    .app-button__icon, .app-button__loader {
      svg, img { width: 22px; height: 22px; }
    }
  }

  // Типы (fill, bezeled, gray, white, negative, text)
  &_type_fill {
    background: $primary-500;
    color: $gray-0;
    box-shadow: $shadow-main;
  }
  &_type_bezeled {
    background: $gray-0;
    color: $primary-500;
    border: 2px solid $primary-500;
  }
  &_type_gray {
    background: $gray-100;
    color: $gray-500;
  }
  &_type_white {
    background: $gray-0;
    color: $primary-500;
    border: 2px solid $gray-100;
    }
  &_type_negative {
    background: $color-error;
    color: $gray-0;
  }
  &_type_text {
    background: transparent;
    color: $primary-500;
    box-shadow: none;
  }
}

@keyframes spin {
  100% { transform: rotate(360deg); }
} 
</style> 