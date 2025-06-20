<template>
  <div class="quantity-input">
    <button class="quantity-input__btn" @click="decrement" :disabled="modelValue <= 1">
      <IconMinus />
    </button>
    <span class="quantity-input__value">{{ modelValue }}</span>
    <button class="quantity-input__btn" @click="increment">
      <IconPlusSignCircle />
    </button>
  </div>
</template>

<script setup>
import IconMinus from '@/components/atoms/icons/IconMinus.vue';
import IconPlusSignCircle
  from '@/components/atoms/icons/IconPlusSignCircle.vue';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(['update:modelValue']);

const increment = () => {
  emit('update:modelValue', props.modelValue + 1);
};

const decrement = () => {
  if (props.modelValue > 1) {
    emit('update:modelValue', props.modelValue - 1);
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.quantity-input {
  display: flex;
  align-items: center;
  gap: $space-m;
  background-color: $gray-100;
  border-radius: $radius-md;
  padding: $space-s;
  justify-content: space-between;
  width: 150px;

  &__btn {
    background: $gray-0;
    border: none;
    border-radius: $radius-sm;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: $gray-900;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);

    &:disabled {
      background-color: $gray-100;
      color: $gray-300;
      cursor: not-allowed;
      box-shadow: none;
    }
  }

  &__value {
    font-size: $font-size-body;
    font-weight: $font-weight-medium;
    color: $gray-950;
  }
}
</style> 