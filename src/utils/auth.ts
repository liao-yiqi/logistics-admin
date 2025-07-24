import Cookies from 'js-cookie'
import { Local_Storage } from './useStorage'
const TokenKey = 'TMS-Admin'

export function getToken() {
  Cookies.get(TokenKey)
  return Local_Storage.get(TokenKey)
}

export function setToken(token: string) {
  Cookies.set(TokenKey, token, { expires: 7 }) // 设置cookie过期时间为7天
  return Local_Storage.set(TokenKey, token)
}

export function removeToken() {
  Cookies.remove(TokenKey)
  return Local_Storage.remove(TokenKey)
}
