import type { Router } from 'vue-router'
import Nprogress from 'nprogress'
import loading from '@/utils/loading'
import { getToken } from '@/utils/auth'
import usePermissionStore from '@/store/modules/permission'
import userInfoStore from '@/store/modules/user'
import { ElMessage } from 'element-plus'

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
  router.beforeEach((to, _from, next) => {
    Nprogress.start()
    if (!window.existLoading) {
      loading.show()
      window.existLoading = true
    }
    if (getToken()) {
      if (to.path === '/login') {
        // 如果已登录，跳转到首页
        next({ path: '/' })
      } else {
        usePermissionStore()
          .generateRoutes()
          .then((accessRoutes) => {
            const asyncRoutes = accessRoutes.map((r, i) => {
              return Object.assign({}, r, { icon: iconList[i] })
            })
            userInfoStore().setRoutes(asyncRoutes) // 设置用户路由
            accessRoutes.forEach((route) => {
              router.addRoute(route) // 动态添加路由
            })
            next({ ...to, replace: true }) // 确保addRoutes已完成
          })
          .catch((err) => {
            userInfoStore()
              .logout()
              .then(() => {
                ElMessage({
                  message: err,
                  type: 'error',
                  plain: true,
                })
              })
            next({ path: '/login' })
          })
        next()
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        // 在白名单 直接进入
        next()
      } else {
        next(`/login?redirect=${to.fullPath}`) // 否则跳转到登录页
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
