<script setup lang="ts">
import { isExternal } from '@/utils/validate'

const props = defineProps<{ to: string }>()

const linkProps = (url: string): object => {
  if (isExternal(url)) {
    return {
      is: 'a',
      href: url,
      target: '_blank',
      rel: 'noopener',
    }
  }
  return {
    is: 'router-link',
    to: url,
  }
}
</script>

<template>
  <component v-bind="linkProps(props.to)">
    <slot />
  </component>
</template>
