<template>
  <div class="app-input" :class="{
    'app-input--error': error,
    'app-input--disabled': disabled,
    'app-input--with-icon': !!icon || !!$slots.icon,
    'app-input--with-prefix': !!$slots.prefix,
    'app-input--with-suffix': !!$slots.suffix
  }">
    <label v-if="label" class="app-input__label">{{ label }}</label>
    <div class="app-input__wrapper">
      <span v-if="$slots.prefix" class="app-input__prefix">
        <slot name="prefix" />
      </span>
      <input
        class="app-input__field"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        v-model="inputValue"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <span v-if="$slots.icon" class="app-input__icon">
        <slot name="icon" />
      </span>
      <span v-else-if="icon" class="app-input__icon">
        <AppIcon :name="icon" type="sprite" />
      </span>
      <span v-if="$slots.suffix" class="app-input__suffix">
        <slot name="suffix" />
      </span>
    </div>
    <div v-if="error" class="app-input__error">{{ error }}</div>
  </div>
</template>

<script setup>
import {
  defineEmits,
  defineProps,
  ref,
  useSlots,
  watch,
} from 'vue';

import AppIcon from './AppIcon.vue';

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  error: String,
  disabled: Boolean,
  icon: String,
  type: { type: String, default: 'text' }
})
const emit = defineEmits(['update:modelValue'])
const inputValue = ref(props.modelValue || '')
const isFocused = ref(false)
const $slots = useSlots()

watch(() => props.modelValue, v => { inputValue.value = v })
watch(inputValue, v => emit('update:modelValue', v))
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.app-input {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: $space-m;

  &__label {
    font-family: $font-main;
    font-size: 15px;
    font-weight: $font-weight-medium;
    color: $gray-500;
    margin-bottom: 6px;
    line-height: 1.2;
  }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: $gray-0;
    border: 2px solid $gray-200;
    border-radius: $radius-main;
    transition: border-color 0.2s, box-shadow 0.2s;
    height: 48px;
    padding: 0 $space-m;
    box-sizing: border-box;
    &:focus-within {
      border-color: $primary-500;
      box-shadow: 0 0 0 2px rgba($primary-500, 0.08);
    }
  }

  &__field {
    flex: 1 1 0%;
    border: none;
    outline: none;
    background: transparent;
    font-family: $font-main;
    font-size: 16px;
    color: $gray-900;
    height: 100%;
    padding: 0;
    &::placeholder {
      color: $gray-400;
      opacity: 1;
      font-weight: $font-weight-regular;
    }
    &:disabled {
      color: $gray-300;
      background: $gray-100;
      cursor: not-allowed;
    }
  }

  &__icon {
    margin-left: $space-s;
    color: $gray-400;
    font-size: 20px;
    display: flex;
    align-items: center;
    svg {
      width: 20px;
      height: 20px;
      display: block;
    }
  }

  &__error {
    color: $color-error;
    font-size: 13px;
    margin-top: 4px;
    font-family: $font-main;
    line-height: 1.2;
  }

  &--error &__wrapper {
    border-color: $color-error;
  }
  &--disabled &__wrapper {
    background: $gray-100;
    border-color: $gray-100;
    cursor: not-allowed;
  }
  &--with-icon &__field {
    padding-right: 28px;
  }

  &__prefix {
    margin-right: $space-s;
    display: flex;
    align-items: center;
    color: $gray-400;
    font-size: 18px;
  }
  &__suffix {
    margin-left: $space-s;
    display: flex;
    align-items: center;
    color: $gray-400;
    font-size: 18px;
  }
  &--with-prefix &__field {
    padding-left: 0;
  }
  &--with-suffix &__field {
    padding-right: 0;
  }
} 
</style> 