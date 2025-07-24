<script setup lang="ts">
import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import AppLink from './Link.vue'
import { isExternal } from '@/utils/validate'
import Item from './Item.vue'

type Props = {
  item: RouteRecordRaw
  isNest?: boolean
  basePath?: string
}

const { item, basePath = '', isNest = false } = defineProps<Props>()

type RouteItem = RouteRecordRaw & {
  noShowingChildren?: boolean
}

const onlyOneChild = ref<RouteItem | null>(null)
const hasOneShowingChild = (children: RouteRecordRaw[], parent: RouteRecordRaw): boolean => {
  const showingChildren = children.filter((childrenItem: RouteRecordRaw) => {
    if (childrenItem.hidden) return false
    onlyOneChild.value = childrenItem
    return true
  })
  if (showingChildren.length === 1) return true
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }
  return false
}

const resolvePath = (routePath: string): string => {
  if (isExternal(routePath)) return routePath
  if (routePath.startsWith('/')) return routePath
  const cleanBase = basePath.replace(/\/+$/, '')
  const cleanRoute = routePath.replace(/^\/+/, '')
  return `${cleanBase}/${cleanRoute}`
}
</script>

<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children === null ? [] : item.children!, item) &&
        (!onlyOneChild?.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <AppLink v-if="onlyOneChild?.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <img v-if="item.parentId === '0'" :src="item.icon" />
          <Item :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </AppLink>
    </template>
    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)"> </el-sub-menu>
  </div>
</template>

<style lang="scss" scoped></style>
