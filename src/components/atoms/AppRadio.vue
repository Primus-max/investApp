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
@import '@/styles/atoms/app-radio.scss';
</style> 