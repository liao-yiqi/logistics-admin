<script setup lang="ts"></script>

<template>
  <div id="app">
    <el-scrollbar ref="main" style="height: 100%">
      <router-view />
    </el-scrollbar>
  </div>
</template>

<style lang="scss">
#app {
  @include bfc;
}
</style>
