<template>
  <nav class="tab-bar">
    <div class="tab-bar__tabs">
      <button
        v-for="(tab, idx) in tabs"
        :key="tab.label + idx"
        :class="[
          'tab-bar__item',
          { 'tab-bar__item--active': idx === activeIndex, 'tab-bar__item--center': tab.center }
        ]"
        @click="onTabClick(idx)"
        type="button"
      >
        <template v-if="tab.center">
          <span class="tab-bar__center-icon">
            <AppIcon name="plus-sign-square" />
          </span>
        </template>
        <template v-else>
          <span class="tab-bar__icon">
            <AppIcon v-if="tab.icon" :name="tab.icon" :class="[{ 'tab-bar__item--active': idx === activeIndex }]" type="sprites"/>
          </span>
          <span class="tab-bar__label">{{ tab.label }}</span>
        </template>
      </button>
    </div>
  </nav>
</template>

<script setup>
import AppIcon from '@/components/atoms/AppIcon.vue';

const props = defineProps({
  tabs: { type: Array, required: true },
  activeIndex: { type: Number, default: 0 }
})
const emit = defineEmits(['update:activeIndex'])
function onTabClick(idx) {
  emit('update:activeIndex', idx)
}
</script>

<style scoped lang="scss">
@import './TabBar.scss';
</style> 