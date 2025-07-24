import {
  _RouteRecordBase,
  RawRouteComponent,
  _RouteLocationBase,
  RouteMeta,
  LocationQuery,
} from 'vue-router'
declare module 'vue-router' {
  interface _RouteRecordBase {
    hidden?: boolean
    roles?: string[]
    alwaysShow?: boolean
    parentPath?: string
    parentId?: string
    icon?: string
    // permissions?: string[]
    // name?: string
    // fullPath?: string
  }
  interface RouteMeta {
    title: string
    icon?: string
    noCache?: boolean
    link?: string
    activeMenu?: string
  }
  interface _RouteLocationBase {
    fullPath: string
    title?: string
    children?: any[]
  }
}
