import { loginAPI } from '@/api/login'
import type { LoginForm, LoginResult } from '@/types/login'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { Local_Storage, Session_Storage } from '@/utils/useStorage'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'

type UserInfoState = {
  token: string
  routes: RouteRecordRaw[]
  user: UserInfo
}
const useUserInfo = defineStore('userInfo', {
  state: (): UserInfoState => ({
    token: getToken(),
    routes: Session_Storage.get('USER_ROUTES'),
    user: Local_Storage.get('USER_INFO'),
  }),
  actions: {
    login(userInfo: LoginForm): Promise<LoginResult> {
      return new Promise((resolve, reject) => {
        loginAPI(userInfo)
          .then(({ data }) => {
            setToken(data.token.token)
            Local_Storage.set('USER_INFO', data.user)
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
        removeToken()
        this.token = ''
        resolve(true)
      })
    },

    setRoutes(route: RouteRecordRaw[]) {
      this.routes = route
      Local_Storage.set('USER_ROUTES', route)
    },
  },
})

export default useUserInfo
