import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const basicDataRoutes: RouteRecordRaw[] = [
  {
    path: '/branches',
    component: Layout,
    name: 'Baranches',
    meta: { title: '网点管理', icon: 'form' },
    hidden: false,
    children: [
      {
        path: 'organization-manage',
        component: () => import('@/views/branches/organization-manage/index.vue'),
        name: 'OrganizationManage',
        meta: { title: '机构管理', icon: 'form', noCache: true },
      },
    ],
  },
]

export default basicDataRoutes
