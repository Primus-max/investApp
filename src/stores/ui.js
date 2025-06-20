import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    isAddOperationModalVisible: false,
  }),
  actions: {
    openAddOperationModal() {
      this.isAddOperationModalVisible = true;
    },
    closeAddOperationModal() {
      this.isAddOperationModalVisible = false;
    },
  },
}); 