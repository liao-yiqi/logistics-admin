<script setup lang="ts">
import { computed } from 'vue'
import Aside from './components/Aside.vue'
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import useLayoutStore from '@/store/modules/layout'
const layoutStore = useLayoutStore()
const classObj = computed((): object => {
  return {
    hideSidebar: !layoutStore.sidebar.opened,
    openSidebar: layoutStore.sidebar.opened,
    whitoutAnimation: layoutStore.sidebar.withoutAnimation,
  }
})

const fixedHeader = computed((): boolean => {
  return true
})
</script>

<template>
  <div :class="classObj" class="layout-wrapper">
    <Aside class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <Header />
      </div>
      <Main />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/mixin' as *;
@use '@/styles/variables' as *;
.layout-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  min-width: 1366px;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
  background-color: #f3f5f9;
  padding: 25px 18px 0 18px;
}
</style>
