<script setup lang="ts"></script>

<template>
  <div class="xl-content">
    <!-- <div class="xl-content__items" v-for="item in 200">{{ item }}</div> -->
  </div>
</template>

<style lang="scss" scoped>
@include b(content) {
  flex: 1;
  overflow: auto;
  padding: 10px;
  @include e(items) {
    padding: 10px;
    border: 1px solid #ccc;
    margin-bottom: 5px;
    border-radius: 5px;
  }
}
</style>
