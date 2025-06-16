<template>
  <div class="sort-dropdown" ref="dropdownRef">
    <button class="sort-dropdown__trigger" @click="toggleMenu">
      <span v-if="activeOption && activeOption.icon" class="sort-dropdown__icon">
        <component :is="activeOption.icon" />
      </span>
      {{ activeOption ? activeOption.label : '' }}
    </button>
    <div v-if="showMenu" class="sort-dropdown__menu">
      <div v-for="option in options" :key="option.value"
        :class="['sort-dropdown__menu-item', { 'sort-dropdown__menu-item--active': modelValue === option.value }]"
        @click="selectOption(option)">
        <span v-if="option.icon" class="sort-dropdown__icon">
          <component :is="option.icon" />
        </span>
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue';

const props = defineProps({
  options: { type: Array, required: true },
  modelValue: { type: [String, Number], default: '' },
});
const emit = defineEmits(['update:modelValue']);
const showMenu = ref(false);
const dropdownRef = ref(null);
const activeOption = computed(() => props.options.find(o => o.value === props.modelValue));
function toggleMenu() { showMenu.value = !showMenu.value; }
function selectOption(option) {
  emit('update:modelValue', option.value);
  showMenu.value = false;
}
function handleClickOutside(e) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    showMenu.value = false;
  }
}
onMounted(() => { document.addEventListener('mousedown', handleClickOutside); });
onBeforeUnmount(() => { document.removeEventListener('mousedown', handleClickOutside); });
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';
.sort-dropdown {
  position: relative;
  display: inline-block;
  &__trigger {
    width: 34px;
    height: 22px;
    font-family: $font-main;
    font-style: normal;
    font-weight: $font-weight-medium;
    font-size: $font-size-body;
    line-height: 22px;
    color: $gray-700;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    flex: none;
    order: 0;
    flex-grow: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    transition: color 0.2s;
  }
  &__icon {
    margin-right: 4px;
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  &__menu {
    position: absolute;
    top: 28px;
    right: 0;
    min-width: 110px;
    background: $gray-0;
    border-radius: $radius-lg;
    box-shadow: 0 2px 8px rgba(44, 62, 80, 0.10);
    z-index: 1000;
    padding: 4px 0;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  &__menu-item {
    font-family: $font-main;
    font-size: $font-size-body;
    color: $gray-700;
    padding: 8px 16px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
    &:hover {
      background: $gray-100;
      color: $primary-500;
    }
    &--active {
      color: $primary-500;
      font-weight: $font-weight-semibold;
      background: $gray-50;
    }
  }
}
</style> 