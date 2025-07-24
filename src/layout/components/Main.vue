<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const key = computed(() => {
  return route.path
})
</script>

<template>
  <router-view :key="key" />
</template>

<style lang="scss" scoped>
.main-container {
  min-height: calc(100vh - 0px);
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background-color: #f3f4f7;
}

.svg {
  width: 50px;
  height: 50px;
}
</style>
