<template>
  <button class="menu-action">
    <span class="menu-action__icon">
      <AppIcon :name="icon" />
    </span>
    <span class="menu-action__label">{{ label }}</span>
  </button>
</template>

<script setup>
import AppIcon from '@/components/atoms/AppIcon.vue';

const props = defineProps({
  icon: { type: String, required: true },
  label: { type: String, required: true }
})
</script>

<style scoped lang="scss">
.menu-action {
  display: flex;
  align-items: center;
  width: 100%;
  background: #23242c;
  border-radius: 16px;
  padding: 16px 20px;
  border: none;
  color: #fff;
  font-family: 'SF Pro Rounded', Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  margin-bottom: 0;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: #282a33;
  }
  &__icon {
    margin-right: 16px;
    display: flex;
    align-items: center;
    svg {
      width: 24px;
      height: 24px;
      color: #aeb8d4;
    }
  }
  &__label {
    flex: 1 1 auto;
    text-align: left;
  }
}
</style> 