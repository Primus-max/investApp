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
@import '@/styles/atoms/app-select.scss';
</style> 