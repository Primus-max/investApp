<script setup>
import AddOperationModal from '@/components/organisms/AddOperationModal.vue';
import CreatePortfolioModal
  from '@/components/organisms/CreatePortfolioModal.vue';
import { usePortfoliosStore } from '@/stores/portfolios';
import { useUiStore } from '@/stores/ui';

const portfoliosStore = usePortfoliosStore();
const uiStore = useUiStore();
</script>

<template>
  <v-app>
    <router-view />
    <CreatePortfolioModal v-model="portfoliosStore.isCreatePortfolioModalOpen" />
    <AddOperationModal v-model:visible="uiStore.isAddOperationModalVisible" />
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

.app__tabbar-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 12px;
  margin: 0 auto;
  max-width: 430px;
  z-index: 100;
  width: 96vw;
  display: flex;
  justify-content: center;
}
</style>
