import type { LoginForm, LoginResult } from '@/types/login'
import request from '../utils/request'

type CaptchParam = {
  key: string
  0: string
}

// 获取验证码
export const getCaptchaAPI = (data: CaptchParam) => {
  return request.raw<ArrayBuffer>('/manager/captcha', { responseType: 'arraybuffer', params: data })
}

// 登录
export const loginAPI = (data: LoginForm) => {
  return request.post<LoginResult>('/manager/login', data)
}

// 获取用户菜单
export const getUserMenuAPI = () => {
  return request.get<Array<any>>('/manager/menus')
}
