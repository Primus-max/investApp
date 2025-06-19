<template>
  <div class="select-option-atom" :class="{ 'select-option-atom--selected': selected, 'select-option-atom--disabled': disabled }" @click="onClick">
    <slot name="icon"></slot>
    <span class="select-option-atom__label"><slot>{{ label }}</slot></span>
    <span v-if="selected" class="select-option-atom__check">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" fill="#4868EA" />
        <polyline points="7,13 11,17 17,9" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  selected: Boolean,
  disabled: Boolean,
  value: [String, Number, Boolean, Object],
  label: String
})
const emit = defineEmits(['select'])
function onClick() {
  if (!props.disabled) emit('select', props.value)
}
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';
.select-option-atom {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: $space-s $space-m;
  gap: $space-xs;
  background: $gray-0;
  box-shadow: 0px 4px 20px rgba($gray-900, 0.04);
  border: 2px solid transparent;
  border-radius: $radius-lg;
  font-size: $font-size-body;
  font-family: $font-main;
  font-weight: $font-weight-semibold;
  color: $gray-700;
  cursor: pointer;
  position: relative;
  transition: border-color 0.18s, background 0.18s;
  min-height: 44px;
  min-width: 0;
  flex: none;
  order: 2;
  flex-grow: 0;

  &--selected {
    border-color: $primary-400;
    background: $gray-0;
    .select-option-atom__label {
      color: $gray-900;
    }
  }
  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &__label {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: $font-size-body;
    font-family: $font-main;
    font-weight: $font-weight-semibold;
    color: $gray-700;
    line-height: 22px;
    order: 1;
  }
  &__check {
    position: absolute;
    top: -10px;
    right: -10px;
    z-index: 2;
  }
  // Стили для иконки-флага
  ::v-deep(.select-group-molecule__icon),
  ::v-deep(img) {
    width: 20px !important;
    height: 20px !important;
    border-radius: 1.5px;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
}
</style> 