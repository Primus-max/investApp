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
  },
  {
    path: '/analytics/:portfolioId',
    name: 'AnalyticsPage',
    component: () => import('@/views/AnalyticsPage.vue')
  },
  {
    path: '/operations',
    name: 'OperationsPage',
    component: () => import('@/views/OperationsPage.vue')
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: () => import('@/views/ProfilePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/investApp/'),
  routes
})

export default router 