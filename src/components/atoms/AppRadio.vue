<template>
  <label class="app-radio" :class="{
    'app-radio--checked': modelValue === value,
    'app-radio--disabled': disabled
  }">
    <input
      class="app-radio__input"
      type="radio"
      :value="value"
      :checked="modelValue === value"
      :disabled="disabled"
      @change="$emit('update:modelValue', value)"
    />
    <span class="app-radio__circle">
      <span v-if="modelValue === value" class="app-radio__check">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="12" fill="#1B43E5" />
          <polyline points="7,13 11,17 17,9" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </span>
    <span class="app-radio__label">
      <slot />
    </span>
  </label>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number, Boolean],
  value: [String, Number, Boolean],
  disabled: Boolean
})
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.app-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  position: relative;
  font-family: $font-main;
  font-size: 16px;
  margin-right: $space-l;

  &__input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  &__circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: $gray-50;
    border: 2px solid $gray-200;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.2s, background 0.2s;
    margin-right: $space-s;
    box-sizing: border-box;
    position: relative;
    svg {
      display: block;
    }
  }

  &__check {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  &__label {
    color: $gray-900;
    font-size: 16px;
    font-family: $font-main;
    line-height: 1.2;
  }

  &--checked &__circle {
    border: none;
    background: transparent;
  }
  &--disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
}
</style> 