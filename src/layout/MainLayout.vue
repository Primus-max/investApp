<template>
  <div ref="layoutRef" class="main-layout">
    <Header />
    <router-view />
  </div>
  <div
    class="main-layout__tabbar-wrap"
    :class="{ 'main-layout__tabbar-wrap--hidden': isTabBarHidden }"
  >
    <TabBar :tabs="tabs" :activeIndex="0" />
  </div>
</template>

<script setup>
import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue';

import Header from '@/components/organisms/Header.vue';
import TabBar from '@/components/organisms/TabBar.vue';

const tabs = [
  { icon: 'home-05', label: 'Главная' },
  { icon: 'briefcase-01', label: 'Портфель' },
  { center: true },
  { icon: 'community', label: 'Рынок' },
  { icon: 'user', label: 'Профиль' }
]

const isTabBarHidden = ref(false)
const layoutRef = ref(null)
let lastScrollY = 0

function handleTabBarScroll(e) {
  const currentY = e.target.scrollTop
  console.log('scrollY:', currentY, 'lastScrollY:', lastScrollY, 'isTabBarHidden:', isTabBarHidden.value)
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

<style scoped>
.main-layout__tabbar-wrap {
  width: 96vw;
  margin: 0 auto;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 46px;
  display: flex;
  justify-content: center;
  align-items: center;  
  z-index: 100;
  transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
}

.main-layout__tabbar-wrap--hidden {
  transform: translateY(120%);
}
</style> 