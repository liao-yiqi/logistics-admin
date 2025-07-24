import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { afterEach, beforeEach } from './routerInterceptor'
import Layout from '@/layout/index.vue'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
  },
  {
    path: '/dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    alwaysShow: false,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...constantRoutes],
})

beforeEach(router)
afterEach(router)
export default router
