<script setup lang="ts">
import { computed } from 'vue'

const logo = computed(() => {
  return new URL('@/assets/logo.png', import.meta.url).href
})

type Props = {
  collapse: boolean
}

const { collapse } = defineProps<Props>()
</script>

<template>
  <div class="sidebar-logo-container">
    <img :src="logo" class="sidebar-logo" :class="{ collapse: collapse }" />
  </div>
</template>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 120px;
  line-height: 70px;
  text-align: center;
  overflow: hidden;
  padding: 20px 0 0;
  margin-bottom: 15px;
  .sidebar-logo {
    width: 152px;
    height: 113px;
  }
  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
