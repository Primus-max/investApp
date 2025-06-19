import { defineStore } from 'pinia';

export const usePortfoliosStore = defineStore('portfolios', {
  state: () => ({
    portfolios: [
      {
        id: 1,
        name: 'Консервативный',
        totalAmount: 123456,
        totalProfit: 8500,
        totalPercent: 7.3,
        assets: [
          {
            bank: 'Сбербанк',
            logo: 'sber',
            amount: 13020.66,
            count: 10,
            price: 302.41,
            percent: 24,
            profit: 19404.71,
            color: 'green',
          },
          {
            bank: 'Точка',
            logo: 'tochka',
            amount: 24820.66,
            count: 10,
            price: 481.33,
            percent: -12,
            profit: -12804.33,
            color: 'red',
          },
          {
            bank: 'Модульбанк',
            logo: 'modul',
            amount: 58020.66,
            count: 10,
            price: 802.88,
            percent: 68,
            profit: 53404.71,
            color: 'green',
          },
          {
            bank: 'Совкомбанк',
            logo: 'sovkom',
            amount: 17020.66,
            count: 10,
            price: 102.41,
            percent: -10,
            profit: -1504.71,
            color: 'red',
          },
        ],
      },
      {
        id: 2,
        name: 'Агрессивный',
        totalAmount: 89000,
        totalProfit: 12500,
        totalPercent: 16.3,
        assets: [
          {
            bank: 'Tone',
            logo: 'ton',
            amount: 45000,
            count: 5,
            price: 9000,
            percent: 10,
            profit: 4000,
            color: 'green',
          },
          {
            bank: 'Сбербанк',
            logo: 'sber',
            amount: 44000,
            count: 5,
            price: 8800,
            percent: 22,
            profit: 8500,
            color: 'green',
          },
          {
            bank: 'Modul',
            logo: 'modul',
            amount: 45000,
            count: 5,
            price: 9000,
            percent: 10,
            profit: 4000,
            color: 'green',
          },
        ],
      },
      {
        id: 3,
        name: 'Комбинированный',
        totalAmount: 53500,
        totalProfit: -2100,
        totalPercent: -4.1,
        assets: [
          {
            bank: 'Bitcoin',
            logo: 'bitcoin',
            amount: 30000,
            count: 3,
            price: 10000,
            percent: -5,
            profit: -1500,
            color: 'red',
          },
          {
            bank: 'Rub',
            logo: 'rub',
            amount: 23500,
            count: 2,
            price: 11750,
            percent: -2.5,
            profit: -600,
            color: 'red',
          },
        ],
      },
    ],
    isCreatePortfolioModalOpen: false,
  }),
  actions: {
    async fetchPortfolioById(id) {
      await new Promise(r => setTimeout(r, 500));
      return this.portfolios.find(p => p.id === Number(id));
    },
    getAllPortfolios() {
      // Можно добавить имитацию задержки, если нужно
      return this.portfolios;
    },
    openCreatePortfolioModal() {
      this.isCreatePortfolioModalOpen = true;
    },
    closeCreatePortfolioModal() {
      this.isCreatePortfolioModalOpen = false;
    },
    toggleCreatePortfolioModal() {
      this.isCreatePortfolioModalOpen = !this.isCreatePortfolioModalOpen;
    }
  },
}); 