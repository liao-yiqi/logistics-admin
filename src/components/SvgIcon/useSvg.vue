<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  iconClass: string
  className?: string
  size: string | number
  color?: string
}

const { iconClass, className = '', size = 14, color = '' } = defineProps<Props>()

const iconName = computed(() => {
  return `#icon-${iconClass}`
})
const svgClass = computed(() => {
  if (className) {
    return `svg-icon ${className}`
  }
  return 'svg-icon'
})
</script>

<template>
  <svg :class="svgClass" aria-hidden="true" :style="{ fontSize: size }">
    <use :href="iconName" :fill="color" />
  </svg>
</template>

<style lang="scss" scoped>
/* .svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
} */
.svg-icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
