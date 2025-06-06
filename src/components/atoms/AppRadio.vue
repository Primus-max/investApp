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
      <span v-if="modelValue === value" class="app-radio__dot"></span>
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