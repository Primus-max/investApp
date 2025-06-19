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
@import '@/styles/_variables.scss';

.app-switch {
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

  &__track {
    width: 51px;
    height: 31px;
    border-radius: 100px;
    background: $gray-100;
    transition: background 0.2s;
    position: relative;
    display: flex;
    align-items: center;    
    box-sizing: border-box;
  }

  &__knob {
    position: absolute;
    left: 2px;
    top: 2px;
    width: 27px;
    height: 27px;
    border-radius: 100px;
    background: #fff;
    box-shadow: 0 3px 8px rgba(0,0,0,0.15), 0 3px 1px rgba(0,0,0,0.06), 0 0 1px rgba(0,0,0,0.04);
    transition: left 0.2s, background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &--checked &__track {
    background: $primary-500;
  }
  &--checked &__knob {
    left: 22px;
    background: #fff;
  }

  &__indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 12px;
  }

  &__label {
    color: $gray-900;
    font-size: 16px;
    font-family: $font-main;
    line-height: 1.2;
    margin-left: 8px;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style> 