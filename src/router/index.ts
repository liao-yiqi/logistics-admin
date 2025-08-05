import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { afterEach, beforeEach } from './routerInterceptor'
import Layout from '@/layout/index.vue'

export const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
    replace: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        replace: false,
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '工作台', icon: 'dasnboard', navShow: false },
      },
    ],
  },
]

const modules = import.meta.glob('./modules/**/*.ts', { eager: true })

const asyncRoutes: RouteRecordRaw[] = []

Object.values(modules).forEach((mod: any) => {
  const routes = mod.default || []
  if (Array.isArray(routes)) {
    asyncRoutes.push(...routes)
  } else {
    asyncRoutes.push(routes)
  }
})

export const constantRoutes: RouteRecordRaw[] = [...basicRoutes, ...asyncRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
})

beforeEach(router)
afterEach(router)
export default router
