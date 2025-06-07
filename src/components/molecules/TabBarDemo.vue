<template>
  <div class="tabbar-demo-bg">
    <TabBar
      :tabs="tabs"
      :activeIndex="activeIndex"
      @update:activeIndex="activeIndex = $event"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

import TabBar from './TabBar.vue';

const activeIndex = ref(0)
const tabs = [
  { icon: 'home-05', label: 'Главная' },
  { icon: 'briefcase-01', label: 'Портфель' },
  { center: true },
  { icon: 'menu-square', label: 'Рынок' },
  { icon: 'user', label: 'Профиль' }
]
</script>

<style scoped lang="scss">
.tabbar-demo-bg {
  min-height: 100vh;
  background: #F7F8FA;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style> 