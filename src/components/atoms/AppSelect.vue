<template>
  <div class="app-select" :class="{
    'app-select--error': error,
    'app-select--disabled': disabled,
    'app-select--open': isOpen
  }" @click.outside="isOpen = false">
    <label v-if="label" class="app-select__label">{{ label }}</label>
    <div class="app-select__wrapper" @click="toggleDropdown" :tabindex="disabled ? -1 : 0">
      <span class="app-select__value" :class="{'app-select__value--placeholder': !selectedLabel}">
        {{ selectedLabel || placeholder || 'Select...' }}
      </span>
      <span class="app-select__icon">
        <AppIcon name="arrow-down" type="sprite" />
      </span>
    </div>
    <transition name="fade">
      <ul v-if="isOpen" class="app-select__dropdown">
        <li v-for="option in options" :key="option.value" class="app-select__option" :class="{'app-select__option--selected': option.value === modelValue, 'app-select__option--disabled': option.disabled}" @click.stop="selectOption(option)" :aria-selected="option.value === modelValue" :aria-disabled="option.disabled">
          <slot name="option" :option="option">
            {{ option.label }}
          </slot>
        </li>
      </ul>
    </transition>
    <div v-if="error" class="app-select__error">{{ error }}</div>
  </div>
</template>

<script setup>
import {
  computed,
  defineEmits,
  defineProps,
  ref,
  watch,
} from 'vue';

import AppIcon from './AppIcon.vue';

const props = defineProps({
  modelValue: [String, Number, null],
  label: String,
  placeholder: String,
  error: String,
  disabled: Boolean,
  options: { type: Array, default: () => [] }
})
const emit = defineEmits(['update:modelValue'])
const isOpen = ref(false)

const selectedLabel = computed(() => {
  const found = props.options.find(opt => opt.value === props.modelValue)
  return found ? found.label : ''
})

function toggleDropdown() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}
function selectOption(option) {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  isOpen.value = false
}

watch(() => props.modelValue, () => { isOpen.value = false })
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.app-select {
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
    cursor: pointer;
    &:focus-within, &:focus, &.app-select--open {
      border-color: $primary-500;
      box-shadow: 0 0 0 2px rgba($primary-500, 0.08);
    }
    &.app-select--disabled {
      background: $gray-100;
      border-color: $gray-100;
      cursor: not-allowed;
    }
  }

  &__value {
    flex: 1 1 0%;
    font-family: $font-main;
    font-size: 16px;
    color: $gray-900;
    height: 100%;
    display: flex;
    align-items: center;
    &--placeholder {
      color: $gray-400;
      font-weight: $font-weight-regular;
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
      transition: transform 0.2s;
    }
  }

  &--open &__icon svg {
    transform: rotate(180deg);
  }

  &__dropdown {
    position: absolute;
    left: 0;
    right: 0;
    top: 110%;
    z-index: 10;
    background: $gray-0;
    border: 2px solid $gray-200;
    border-radius: $radius-main;
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    margin: 0;
    padding: 4px 0;
    list-style: none;
    max-height: 240px;
    overflow-y: auto;
    animation: fadeIn 0.2s;
  }

  &__option {
    font-family: $font-main;
    font-size: 16px;
    color: $gray-900;
    padding: 10px $space-m;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    &:hover:not(&--disabled) {
      background: $primary-50;
      color: $primary-500;
    }
    &--selected {
      background: $primary-100;
      color: $primary-500;
      font-weight: $font-weight-bold;
    }
    &--disabled {
      color: $gray-300;
      cursor: not-allowed;
      background: none;
    }
  }

  &__error {
    color: $color-error;
    font-size: 13px;
    margin-top: 4px;
    font-family: $font-main;
    line-height: 1.2;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style> 