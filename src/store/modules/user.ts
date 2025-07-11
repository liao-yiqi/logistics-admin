import type { UserInfo } from '@/types/global'
import { defineStore } from 'pinia'

type UserInfoState = UserInfo & {
  token: string
}
const userInfoStore = defineStore('userInfo', {
  state: (): UserInfoState => ({
    token: '',
    account: '',
    name: '',
    email: '',
    mobile: '',
    sex: { desc: '', code: '' },
    acatar: null,
  }),
  actions: {},
})

export default userInfoStore
