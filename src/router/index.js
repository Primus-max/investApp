import {
  createRouter,
  createWebHistory,
} from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: () => import('@/views/MainPage.vue')
  },
  {
    path: '/portfolio/:id',
    name: 'PortfolioPage',
    component: () => import('@/views/PortfolioPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/investApp/'),
  routes
})

export default router 