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
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: $space-s $space-m; // 8px 12px
    gap: $space-xs; // 4px
    margin: 0 auto;
    width: 82px;
    height: 38px;
    background: $gray-0;
    box-shadow: 0 4px 20px rgba(0,0,0,0.04);
    border-radius: $radius-md; // 12px
    border: none;
    outline: none;
    cursor: pointer;
    font-family: $font-main;
    font-style: normal;
    font-weight: $font-weight-medium;
    font-size: $font-size-body;
    line-height: 22px;
    color: $gray-700;
    transition: color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }
  &__icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0;
    flex: none;
    order: 1;
    flex-grow: 0;
  }
  &__menu {
    position: absolute;
    top: 44px;
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