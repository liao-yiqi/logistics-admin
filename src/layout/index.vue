<script setup lang="ts">
import Menu from './Menu/index.vue'
import Header from './Header/index.vue'
import Content from './Content/index.vue'
</script>

<template>
  <div class="xl-page">
    <div>
      <Menu />
    </div>
    <div class="xl-page__right">
      <Header />
      <Content />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@include b(page) {
  @include bfc;
  display: flex;
  @include e(right) {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
</style>
