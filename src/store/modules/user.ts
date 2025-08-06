import { loginAPI } from '@/api/login'
import type { LoginForm, LoginResult } from '@/types/login'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { Local_Storage, Session_Storage } from '@/utils/useStorage'
import { ElMessage, ElMessageBox } from 'element-plus'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { globalKeys } from '@/config/globalConfig'

type UserInfoState = {
  token: string
  routes: RouteRecordRaw[]
  user: UserInfo
}
const useUserInfo = defineStore('userInfo', {
  state: (): UserInfoState => ({
    token: getToken(),
    routes: Session_Storage.get(globalKeys.USER_ROUTES),
    user: Local_Storage.get(globalKeys.USER_INFO) || {},
  }),
  actions: {
    login(userInfo: LoginForm): Promise<LoginResult> {
      return new Promise((resolve, reject) => {
        loginAPI(userInfo)
          .then(({ data }) => {
            setToken(data.token.token)
            Local_Storage.set(globalKeys.USER_INFO, data.user)
            ElMessage.success('登录成功')
            resolve(data)
          })
          .catch((error) => {
            ElMessage.error('登录失败')
            reject(error)
          })
      })
    },

    logout() {
      return new Promise((resolve) => {
        ElMessageBox.confirm('确定退出登录吗?', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            removeToken()
            this.token = ''
            Local_Storage.remove(globalKeys.USER_INFO)
            Local_Storage.remove(globalKeys.USER_ROUTES)
            ElMessage.success('退出登录成功！')
            location.reload()
            resolve(true)
          })
          .catch(() => {
            resolve(false)
          })
      })
    },

    setRoutes(route: RouteRecordRaw[]) {
      this.routes = route
      Local_Storage.set(globalKeys.USER_ROUTES, route)
    },
  },
})

export default useUserInfo
