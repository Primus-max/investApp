<template>
  <div class="main-layout">
    <div v-if="isTabMenuOpen" class="app-blur-overlay"></div>
    <div
      class="main-layout__header"
      :class="{ 'main-layout__header--empty': !$slots.header }"
    >
      <slot name="header" />
    </div>
    <div
      class="main-layout__body"
      :class="{ 'main-layout__body--no-header': !$slots.header }"
    >
      <slot />
    </div>
    <div
      class="main-layout__tabbar-wrap"
      :class="{ 'main-layout__tabbar-wrap--hidden': uiStore.isTabBarHidden }"
    >
      <TabBar :tabs="tabs" :activeIndex="activeIndex" @update:activeIndex="handleTabChange" @menu-open="isTabMenuOpen = $event" />
    </div>
  </div>
</template>

<script setup>
import {
  onMounted,
  onUnmounted,
  ref,
  useSlots,
  watch,
} from 'vue';

import {
  useRoute,
  useRouter,
} from 'vue-router';

import TabBar from '@/components/organisms/TabBar.vue';
import { useUiStore } from '@/stores/ui';

const tabs = [
  { icon: 'home-05', label: 'Главная' },
  { icon: 'briefcase-01', label: 'Портфель' },
  { center: true },
  { icon: 'menu-square', label: 'Рынок' },
  { icon: 'user', label: 'Профиль' }
]

const router = useRouter()
const route = useRoute()
const activeIndex = ref(0)
const isTabMenuOpen = ref(false)
const uiStore = useUiStore();
let lastScrollY = 0;

function handleTabChange(newIndex) {
  activeIndex.value = newIndex
  
  // Навигация по табам
  switch (newIndex) {
    case 0: // Главная
      router.push('/')
      break
    case 1: // Портфель
      router.push('/portfolio/1')
      break
    case 3: // Рынок
      console.log('Рынок - пока не реализован')
      break
    case 4: // Профиль
      router.push('/profile')
      break
  }
}

function handleScroll(event) {
  const scrollingElement = event.target;
  const scrollTop = scrollingElement.scrollTop;

  if (scrollTop > lastScrollY && scrollTop > 10) {
    if (!uiStore.isTabBarHidden) {
      uiStore.isTabBarHidden = true;
    }
  } else if (scrollTop < lastScrollY) {
    if (uiStore.isTabBarHidden) {
      uiStore.isTabBarHidden = false;
    }
  }
  lastScrollY = scrollTop < 0 ? 0 : scrollTop;
}

function updateActiveTabFromRoute() {
  if (route.name === 'MainPage') {
    activeIndex.value = 0
  } else if (route.name === 'PortfolioPage') {
    activeIndex.value = 1
  } else if (route.name === 'AnalyticsPage') {
    activeIndex.value = 1
  } else if (route.name === 'ProfilePage') {
    activeIndex.value = 4
  }
  // Добавить другие роуты при необходимости
}

const $slots = useSlots();

// Следим за изменениями роута
watch(route, updateActiveTabFromRoute, { immediate: true })

onMounted(() => {
  // Listen on document in capture phase to catch the event from any scrolling element.
  document.addEventListener('scroll', handleScroll, true);
});

onUnmounted(() => {
  document.removeEventListener('scroll', handleScroll, true);
});

</script>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';

.app-blur-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  backdrop-filter: blur(5px);
  // background: rgba(255,255,255,0.4);
  // transition: backdrop-filter 0.2s, background 0.2s;
}

.main-layout__tabbar-wrap {
  width: 96vw;
  margin: 0 auto;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;  
  z-index: 1011;
  transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
}

.main-layout {
  width: 100vw;
  min-height: 100vh;
  background: $color-bg-main;

  &__header {
    width: 100%;
    background: #1b1bb1;
    border-radius: $radius-md $radius-md 0 0;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);    
    &--empty {
      min-height: 0 !important;
      height: 0 !important;
      background: none !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      padding: 0 !important;
      overflow: hidden;
    }
  }
  &__body {
    width: 100%;
    background: $color-bg-main;
    border-radius: $radius-xxl $radius-xxl 0 0;
    margin-top: -32px;
    // box-shadow: 0 8px 32px rgba(0,0,0,0.08);
    z-index: 2;
    &--no-header {
      margin-top: 0 !important;
    }
  }
  &__tabbar-wrap--hidden {
    transform: translateY(300%);
  }
}
</style> 