<script setup>
// import { AppButtonDemo } from '@/components/atoms';

// import TabBarDemo from '@/components/molecules/TabBarDemo.vue';
</script>

<template>
  <v-app class="app">
    <SvgSpriteLoader />
    <router-view />
    <!-- <AppButtonDemo /> -->
    <!-- <section style="margin-top: 48px; height: 100vh;">
      <h2 style="text-align:center; margin-bottom: 24px;">TabBar Demo</h2>
      <TabBarDemo />
    </section> -->
  </v-app>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
