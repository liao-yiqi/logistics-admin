import type { Router } from 'vue-router'
import Nprogress from 'nprogress'
import loading from '@/utils/loading'
import { getToken } from '@/utils/auth'
import usePermissionStore from '@/store/modules/permission'
import userInfoStore from '@/store/modules/user'
import { ElMessage } from 'element-plus'
import { isRelogin } from '@/utils/request'

const whiteList = ['/login', '/register', '/404', '/403']
const iconList: string[] = [
  new URL('@/assets/navIcons/gzt.png', import.meta.url).href,
  new URL('@/assets/navIcons/jcsj.png', import.meta.url).href,
  new URL('@/assets/navIcons/clgl.png', import.meta.url).href,
  new URL('@/assets/navIcons/yggl.png', import.meta.url).href,
  new URL('@/assets/navIcons/ywgl.png', import.meta.url).href,
  new URL('@/assets/navIcons/ddgl.png', import.meta.url).href,
]

export const beforeEach = (router: Router) => {
  router.beforeEach(async (to, _from, next) => {
    Nprogress.start()
    if (!window.existLoading) {
      loading.show()
      window.existLoading = true
    }
    const hasToken = getToken()
    if (hasToken) {
      if (to.path === '/login') {
        next({ path: '/' })
        return
      }
      const permissionStore = usePermissionStore()
      const userStore = userInfoStore()
      if (!isRelogin.show) {
        try {
          const accessRoutes = await permissionStore.generateRoutes()
          const asyncRoutes = accessRoutes.map((r, i) => ({
            ...r,
            icon: iconList[i],
          }))
          userStore.setRoutes(asyncRoutes)
          accessRoutes.forEach((route) => {
            router.addRoute(route)
          })
          isRelogin.show = true
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
        } catch (err) {
          await userStore.logout()
          ElMessage({
            message: err instanceof Error ? err.message : String(err),
            type: 'error',
            plain: true,
          })
          next({ path: '/login' })
        }
      } else {
        next()
      }
    } else {
      if (whiteList.includes(to.path)) {
        next()
      } else {
        next(`/login?redirect=${to.fullPath}`)
      }
    }
  })
}

export const afterEach = (router: Router) => {
  router.afterEach(() => {
    if (window.existLoading) {
      loading.hide()
    }
    Nprogress.done()
  })
}
