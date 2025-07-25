<script setup lang="ts">
import { isExternal } from '@/utils/validate'
import { computed } from 'vue'

const props = defineProps<{ to: any }>()

const isExt = computed((): boolean => {
  return isExternal(props.to)
})

const type = computed((): string => {
  if (isExt.value) {
    return 'a'
  }
  return 'router-link'
})

const linkProps = (): object => {
  if (isExt.value) {
    return {
      herf: props.to,
      target: '_blank',
      rel: 'noopener',
    }
  }
  return {
    to: props.to,
  }
}
</script>

<template>
  <component :is="type" v-bind="linkProps()">
    <slot />
  </component>
</template>
