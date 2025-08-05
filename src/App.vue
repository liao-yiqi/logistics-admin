<script setup lang="ts"></script>

<template>
  <div id="app">
    <el-scrollbar ref="main" style="height: 100%; width: 100%">
      <router-view />
    </el-scrollbar>
  </div>
</template>

<style lang="scss">
#app {
  :deep(.el-scrollbar__wrap) {
    overflow-x: hidden;
  }
}
</style>
