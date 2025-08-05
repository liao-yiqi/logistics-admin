<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const key = computed(() => {
  return route.path
})
</script>

<template>
  <section class="app-container">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<style lang="scss" scoped>
.app-container {
  min-height: calc(100vh - 0px);
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background-color: #f3f4f7;;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fixed-header + .app-container {
  padding-top: 46px;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
