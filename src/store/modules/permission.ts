import { getUserMenuAPI } from '@/api/login'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { constantRoutes } from '@/router/index'

const usePermissionStore = defineStore('permission', {
  state: (): PermiState => {
    return {
      routes: [],
      sideBarRoutes: [],
    }
  },
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.routes = constantRoutes.concat(routes)
    },
    setSideBarRoutes(routes: RouteRecordRaw[]) {
      this.sideBarRoutes = routes
    },
    generateRoutes() {
      return new Promise<RouteRecordRaw[]>((resolve) => {
        getUserMenuAPI().then((res) => {
          const sData: RouteRecordRaw[] = JSON.parse(JSON.stringify(res.data))
          let rData: RouteRecordRaw[] = JSON.parse(JSON.stringify(res.data))
          // const defaultData: RouteRecordRaw[] = JSON.parse(JSON.stringify(res.data))
          const sidebarRoutes = filterAsyncRouter(sData)
          const rewriteRoutes = filterAsyncRouter(rData, true)
          this.setRoutes(rewriteRoutes)
          this.setSideBarRoutes(constantRoutes.concat(sidebarRoutes))
          resolve(rewriteRoutes)
        })
      })
    },
  },
})

// 将后台传来的路由字符串,转换为组件对象
function filterAsyncRouter(asyncRouterMap: RouteRecordRaw[], type = false) {
  return asyncRouterMap.filter((route) => {
    if (type && route.children) {
      route.children = filterAsyncRouter(route.children)
    }
    if (route.component) {
      // @ts-ignore
      if (route.component === 'Layout') {
        // @ts-ignore
        route.component = Layout
      } else {
        // @ts-ignore
        route.component = loadView(route.component)
      }
    }
    return true
  })
}

const modules = import.meta.glob('./../../views/**/*.vue')

function loadView(view: string) {
  let result
  for (const path in modules) {
    const dir = path.split('views')[1].split('.vue')[0]
    if (dir === view) result = () => modules[path]()
  }
  return result
}

export default usePermissionStore
