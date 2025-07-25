import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { ElMessage } from 'element-plus'
import { getToken, removeToken } from './auth'
import router from '@/router/index'

export let isRelogin = { show: false }
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 10000,
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['Content-Type'] = 'application/json'
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 判断是否是二进制流（如图片验证码、文件下载等）
    const contentType = response.headers['content-type']
    const isBinary =
      response.config.responseType === 'blob' ||
      response.config.responseType === 'arraybuffer' ||
      contentType?.includes('application/octet-stream') ||
      contentType?.includes('image/')
    if (isBinary) {
      return response.data
    }
    const { code, msg } = response.data
    if (code === 200) {
      return response.data
    } else {
      ElMessage.error(msg || '请求错误')
      return Promise.reject(new Error(msg))
    }
  },
  (error) => {
    let msg = ''
    switch (error.response?.status) {
      case 401:
        removeToken()
        router.push('/login')
        msg = '登录失效，请重新登录'
        break
      case 403:
        msg = '没有权限'
        break
      case 404:
        msg = '请求地址不存在'
        break
      case 500:
        msg = '服务器错误'
        break
      default:
        msg = error.response?.data?.msg || '网络连接错误'
    }
    ElMessage.error(msg)
    return Promise.reject(error)
  }
)

interface Data<T> {
  code: number
  msg: string
  data: T
}

const request = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<Data<T>> {
    return service.get(url, config)
  },
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Data<T>> {
    return service.post(url, data, config)
  },
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Data<T>> {
    return service.put(url, data, config)
  },
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<Data<T>> {
    return service.delete(url, config)
  },
  raw<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },
}

export default request
