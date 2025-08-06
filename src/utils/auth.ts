import Cookies from 'js-cookie'
import { Local_Storage } from './useStorage'
import { globalKeys } from '@/config/globalConfig'

export function getToken() {
  Cookies.get(globalKeys.TokenKey)
  return Local_Storage.get(globalKeys.TokenKey)
}

export function setToken(token: string) {
  Cookies.set(globalKeys.TokenKey, token, { expires: 7 }) // 设置cookie过期时间为7天
  return Local_Storage.set(globalKeys.TokenKey, token)
}

export function removeToken() {
  Cookies.remove(globalKeys.TokenKey)
  return Local_Storage.remove(globalKeys.TokenKey)
}
