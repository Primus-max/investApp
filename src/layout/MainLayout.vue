<template>
  <div class="main-layout">
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
let lastScrollY = window.scrollY

function onScroll() {
  const currentY = window.scrollY
  if (currentY > lastScrollY && currentY > 60) {
    isTabBarHidden.value = true
  } else {
    isTabBarHidden.value = false
  }
  lastScrollY = currentY
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
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