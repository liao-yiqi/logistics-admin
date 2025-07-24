import { defineStore } from 'pinia'

type LayoutState = {
  sidebar: {
    opened: boolean // 是否展开侧边栏
    withoutAnimation: boolean // 是否不带动画
  }
}

const useLayoutStore = defineStore('layout', {
  state: (): LayoutState => {
    return {
      sidebar: {
        opened: true,
        withoutAnimation: false,
      },
    }
  },
})

export default useLayoutStore
