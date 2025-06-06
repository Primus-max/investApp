<template>
  <div class="app-radio-group">
    <AppRadio
      v-for="option in options"
      :key="option.value"
      :modelValue="modelValue"
      :value="option.value"
      :disabled="option.disabled || disabled"
      @update:modelValue="$emit('update:modelValue', $event)"
    >
      {{ option.label }}
    </AppRadio>
  </div>
</template>

<script setup>
import AppRadio from './AppRadio.vue';

const props = defineProps({
  modelValue: [String, Number, Boolean],
  options: { type: Array, default: () => [] },
  disabled: Boolean
})
</script>

<style scoped lang="scss">
.app-radio-group {
  display: flex;
  gap: 16px;
}
</style> 