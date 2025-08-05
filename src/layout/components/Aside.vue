<script setup lang="ts">
import { computed } from 'vue'
import Logo from './Logo.vue'
import useLayoutStore from '@/store/modules/layout'
import { useRoute } from 'vue-router'
import MenuItem from '../Menu/MenuItem.vue'
import useUserInfo from '@/store/modules/user'

const showLogo = computed(() => {
  return true
})

const layoutStore = useLayoutStore()
const isCollapse = computed(() => {
  return !layoutStore.sidebar.opened
})

const { meta, path } = useRoute()
const activeMenu = computed(() => {
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const userInfoStore = useUserInfo()
const routes = computed(() => {
  return userInfoStore.routes
})
</script>

<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse-transition="false"
        :unique-opened="true"
        :collapse="isCollapse"
        text-color="var(--menu-text)"
        active-text-color="var(--menu-active-text)"
        background-color="#fff"
        mode="vertical"
      >
        <MenuItem v-for="route in routes" :key="route.path" :item="route" :basePath="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped></style>
