import { defineCustomElement } from 'vue'

declare module 'vue' {
  export interface GlobalComponents {
    SvgIcon: (typeof import('@/components/SvgIcon/index.vue'))['default']
  }
}
