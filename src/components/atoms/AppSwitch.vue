<template>
  <label class="app-switch" :class="{
    'app-switch--checked': modelValue,
    'app-switch--disabled': disabled,
    'app-switch--with-indicator': indicator
  }">
    <input
      class="app-switch__input"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', !modelValue)"
    />
    <span class="app-switch__track">
      <span class="app-switch__knob">
        <span v-if="indicator" class="app-switch__indicator">
          <template v-if="modelValue">
            <svg width="12" height="12" viewBox="0 0 12 12"><polyline points="2,7 5,10 10,2" fill="none" stroke="#1B43E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </template>
          <template v-else>
            <svg width="12" height="12" viewBox="0 0 12 12"><line x1="2" y1="2" x2="10" y2="10" stroke="#E53A37" stroke-width="2" stroke-linecap="round"/><line x1="10" y1="2" x2="2" y2="10" stroke="#E53A37" stroke-width="2" stroke-linecap="round"/></svg>
          </template>
        </span>
      </span>
    </span>
    <span class="app-switch__label">
      <slot />
    </span>
  </label>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  disabled: Boolean,
  indicator: Boolean
})
</script>

<style scoped lang="scss">
@import '@/styles/atoms/app-switch.scss';
</style> 