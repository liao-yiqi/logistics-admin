<script setup lang="ts">
const { isActive = false } = defineProps<{ isActive: boolean }>()

const toggleActive = (): boolean => {
  return isActive
}

toggleActive()
</script>

<template>
  <div />
</template>

<style lang="scss" scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}
.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
