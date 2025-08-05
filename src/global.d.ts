// <reference types="types" />
export {}
type PermissionRouterRaw = import('vue-router').RouteRecordRaw
export declare global {
  interface UserInfo {
    id?: string
    createUser?: string | null
    updateUser?: string | null
    superior?: string
    account: string
    name: string
    orgId?: string
    orgName?: string | null
    stationId?: string
    stationName?: string | null
    email: string | null
    mobile: string | null
    sex: Sex
    status?: boolean
    acatar: string | null
    lastLoginTime?: string | null
    roles?: string[] | null
    roleNames?: string | null
    avatar: string | null
  }

  interface Sex {
    desc: string
    code: string
  }

  interface Window {
    existLoading: boolean
  }

  interface PermiState {
    routes: PermissionRouterRaw[]
    sideBarRoutes: PermissionRouterRaw[]
  }
}
