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
  return `${cleanBase}`
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
          <img v-if="item.parentId === '0'" :src="item.icon" class="menu-icon" />
          <Item :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </AppLink>
    </template>
    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)">
      <template #title>
        <img :src="item.icon" class="menu-icon" style="margin-right: 19px" />
        <Item v-if="item.meta" :title="item.meta.title" />
      </template>
      <MenuItem
        v-for="subItem in item.children"
        :key="subItem.path"
        :isNest="true"
        :item="subItem"
        :basePath="resolvePath(subItem.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<style lang="scss" scoped>
.menu-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  vertical-align: middle;
}

a {
  text-decoration: none;
}
</style>
