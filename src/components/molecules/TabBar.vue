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
        <div class="tab-bar__content">
          <template v-if="tab.center">
            <AppIcon name="plus-sign-square" />
          </template>
          <template v-else>
            <span class="tab-bar__icon">
              <AppIcon v-if="tab.icon" :name="tab.icon" :class="[{ 'tab-bar__item--active': idx === activeIndex }]" />
            </span>
          </template>
          <span class="tab-bar__label" v-if="tab.label">{{ tab.label }}</span>
        </div>
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