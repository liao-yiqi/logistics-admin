<script lang="ts">
import { createVNode, defineComponent, type VNode } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

type Props = {
  icon?: string
  title?: string
}

export default defineComponent({
  name: 'Item',
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  setup(props: Props) {
    return (): VNode[] => {
      const vnodes: VNode[] = []

      if (props.icon) {
        vnodes.push(createVNode(SvgIcon, { 'icon-class': props.icon }))
      }

      if (props.title) {
        vnodes.push(createVNode('span', {}, props.title))
      }

      return vnodes
    }
  },
})
</script>
