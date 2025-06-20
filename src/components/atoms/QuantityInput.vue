<template>
  <div class="quantity-input">
    <button class="quantity-input__btn" @click="decrement" :disabled="modelValue <= 0">
      <IconMinus />
    </button>
    <input type="number" class="quantity-input__value" :value="modelValue" @input="onInput" />
    <button class="quantity-input__btn" @click="increment">
      <IconPlus />
    </button>
  </div>
</template>

<script setup>
import IconMinus from '@/components/atoms/icons/IconMinus.vue';
import IconPlus from '@/components/atoms/icons/IconPlus.vue';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['update:modelValue']);

const increment = () => {
  emit('update:modelValue', props.modelValue + 1);
};

const decrement = () => {
  if (props.modelValue > 0) {
    emit('update:modelValue', props.modelValue - 1);
  }
};

const onInput = (event) => {
  const value = parseInt(event.target.value, 10);
  if (!isNaN(value)) {
    emit('update:modelValue', value);
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.quantity-input {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  gap: 12px;
  width: 150px;
  height: 48px;
  background: $gray-0;
  border: 1px solid $gray-100;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
  border-radius: 16px;

  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: $gray-50;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    color: $gray-950;

    &:disabled {
      background-color: $gray-100;
      cursor: not-allowed;
      color: $gray-400;
    }
  }

  &__value {
    font-family: $font-main;
    font-style: normal;
    font-weight: $font-weight-regular;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: $gray-950;
    border: none;
    background: transparent;
    width: 100%;
    flex-grow: 1;

    &:focus {
      outline: none;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style> 