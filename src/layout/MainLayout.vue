<template>
  <div class="main-layout">
    <div class="main-layout__header">
      <slot name="header" />
    </div>
    <div class="main-layout__body">
      <slot />
    </div>
    <div
      class="main-layout__tabbar-wrap"
      :class="{ 'main-layout__tabbar-wrap--hidden': isTabBarHidden }"
    >
      <TabBar :tabs="tabs" :activeIndex="activeIndex" />
    </div>
  </div>
</template>

<script setup>
import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue';

import TabBar from '@/components/organisms/TabBar.vue';

const tabs = [
  { icon: 'home-05', label: 'Главная' },
  { icon: 'briefcase-01', label: 'Портфель' },
  { center: true },
  { icon: 'menu-square', label: 'Рынок' },
  { icon: 'user', label: 'Профиль' }
]

const activeIndex = ref(0)
const isTabBarHidden = ref(false)
const layoutRef = ref(null)
let lastScrollY = 0

function handleTabBarScroll(e) {
  const currentY = e.target.scrollTop
  if (currentY > lastScrollY) {
    isTabBarHidden.value = true
  } else if (currentY < lastScrollY) {
    isTabBarHidden.value = false
  }
  lastScrollY = currentY
}

onMounted(() => {
  if (layoutRef.value) {
    layoutRef.value.addEventListener('scroll', handleTabBarScroll)
  }
})
onUnmounted(() => {
  if (layoutRef.value) {
    layoutRef.value.removeEventListener('scroll', handleTabBarScroll)
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';

.main-layout {
  width: 100vw;
  min-height: 100vh;
  background: #f5f5f5;

  &__header {
    width: 100%;
    min-height: 80px;
    background: #1b1bb1;
    border-radius: $radius-main $radius-main 0 0;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    z-index: 1;
  }
  &__body {
    width: 100%;
    background: #fff;
    border-radius: $radius-xxl $radius-xxl 0 0;
    margin-top: -32px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.08);
    z-index: 2;
  }
  &__tabbar-wrap {
    width: 96vw;
    margin: 0 auto;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;  
    z-index: 100;
    transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
  }
  &__tabbar-wrap--hidden {
    display: none;
  }
}
</style> 