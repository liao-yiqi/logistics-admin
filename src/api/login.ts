import type { LoginForm, LoginResult } from '@/types/login'
import request from '../utils/request'

type CaptchParam = {
  key: string
  0: string
}

export const getCaptchaAPI = (data: CaptchParam) => {
  return request.raw<ArrayBuffer>('/manager/captcha', { responseType: 'arraybuffer', params: data })
}

export const loginAPI = (data: LoginForm) => {
  return request.post<LoginResult>('/manager/login', data)
}
