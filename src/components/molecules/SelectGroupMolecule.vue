<template>
  <div class="select-group-molecule">
    <SelectOptionAtom
      v-for="option in options"
      :key="option.value"
      :selected="option.value === modelValue"
      :disabled="option.disabled || disabled"
      :value="option.value"
      :label="option.label"
      @select="onSelect"
    >
      <template #icon>
        <slot name="icon" :option="option">
          <span v-if="option.icon" class="select-group-molecule__icon">
            <img :src="option.icon" alt="" />
          </span>
        </slot>
      </template>
    </SelectOptionAtom>
  </div>
</template>

<script setup>
import SelectOptionAtom from '../atoms/SelectOptionAtom.vue';

const props = defineProps({
  options: { type: Array, default: () => [] },
  modelValue: [String, Number, Boolean, Object],
  disabled: Boolean
})
const emit = defineEmits(['update:modelValue'])
function onSelect(val) {
  emit('update:modelValue', val)
}
</script>

<style scoped lang="scss">
.select-group-molecule {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}
.select-group-molecule__icon {
  width: 28px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
}
</style> 