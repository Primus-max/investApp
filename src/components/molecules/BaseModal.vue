<template>
  <div v-if="visible" class="base-modal" @click.self="close">
    <div class="base-modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:visible']);

const close = () => {
  emit('update:visible', false);
};
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.base-modal {
  position: fixed;
  inset: 0;
  z-index: 100000;
  width: 100%;
  height: 100%;
  background-color: rgba($gray-900, 0.32);
  display: flex;
  flex-direction: column;

  &__content {
    position: relative;
    background: $gray-50;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
}
</style> 