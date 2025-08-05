<script setup lang="ts"></script>

<template>
  <div v-if="$route.meta.pageHeader" class="breadcrumb-container">
    <el-page-header
      style="font-weight: bold; color: #2a2929; font-size: 20px"
      :content="$route.meta.title"
      title="返回"
    />
  </div>
  <div v-else style="float: left; margin-left: 2px">
    <font style="font-size: 16px; color: #2a2929; font-weight: bold">{{ $route.meta.title }}</font>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb-container {
  float: left;
  position: relative;
  margin-left: 20px;
}
</style>
