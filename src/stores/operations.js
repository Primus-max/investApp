import { defineStore } from 'pinia-colada';

export const useOperationsStore = defineStore('operations', {
  state: () => ({
    operationsByDate: [
      {
        date: '10 мая',
        items: [
          {
            bank: 'Сбербанк',
            type: 'Покупка',
            amount: -3020.66,
            count: 10,
            price: 302.41,
            icon: new URL('@/assets/icons/coins/sber.svg', import.meta.url).href,
          },
          {
            bank: 'Точка',
            type: 'Покупка',
            amount: -4820.66,
            count: 10,
            price: 481.33,
            icon: new URL('@/assets/icons/coins/tochka.svg', import.meta.url).href,
          },
          {
            bank: 'Модульбанк',
            type: 'Продажа',
            amount: 8200.66,
            count: 10,
            price: 802.88,
            icon: new URL('@/assets/icons/coins/modul.svg', import.meta.url).href,
          },
        ],
      },
      {
        date: '4 мая',
        items: [
          {
            bank: 'Сбербанк',
            type: 'Покупка',
            amount: -3020.66,
            count: 10,
            price: 302.41,
            icon: new URL('@/assets/icons/coins/sber.svg', import.meta.url).href,
          },
          {
            bank: 'Модульбанк',
            type: 'Продажа',
            amount: 8200.66,
            count: 10,
            price: 802.88,
            icon: new URL('@/assets/icons/coins/modul.svg', import.meta.url).href,
          },
          {
            bank: 'Точка',
            type: 'Покупка',
            amount: -4820.66,
            count: 10,
            price: 481.33,
            icon: new URL('@/assets/icons/coins/tochka.svg', import.meta.url).href,
          },
        ],
      },
      {
        date: '27 апреля',
        items: [
          {
            bank: 'Сбербанк',
            type: 'Покупка',
            amount: -3020.66,
            count: 10,
            price: 302.41,
            icon: new URL('@/assets/icons/coins/sber.svg', import.meta.url).href,
          },
          {
            bank: 'Модульбанк',
            type: 'Продажа',
            amount: 8200.66,
            count: 10,
            price: 802.88,
            icon: new URL('@/assets/icons/coins/modul.svg', import.meta.url).href,
          },
        ],
      },
    ],
  }),
  actions: {
    // Здесь можно добавить фильтрацию, поиск и т.д.
  },
}); 