import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/users',
    name: 'UserManagement',
    component: () => import('../views/UserManagement.vue')
  },
  {
    path: '/stats',
    name: 'DataStatistics',
    component: () => import('../views/DataStatistics.vue')
  },
  {
    path: '/settings',
    name: 'SystemSettings',
    component: () => import('../views/SystemSettings.vue')
  },
  {
    path: '/PageTest07',
    name: 'PageTest07',
    component: () => import('../views/PageTest07.vue')
  },
  {
    path: '/RealTimeDashboard',
    name: 'RealTimeDashboard',
    component: () => import('../views/RealTimeDashboard.vue')
  },
  {
    path: '/UserStatusMonitor',
    name: 'UserStatusMonitor',
    component: () => import('../views/UserStatusMonitor.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
