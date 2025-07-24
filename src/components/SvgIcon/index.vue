<script lang="ts">
import { computed, createVNode, defineComponent, resolveComponent } from 'vue'
import Svg from './useSvg.vue'
type Props = {
  iconClass: string
  className?: string
  size?: string | number
  color?: string
}

export default defineComponent(
  (props: Props) => {
    const { iconClass, className = '', size = 14, color } = props
    const iconStyle = computed(() => {
      return {
        fontSize: size + 'px',
        color: color,
      }
    })
    if (props.iconClass.indexOf('el-icon-') === 0) {
      const names = iconClass.split('el-icon-')
      return () =>
        createVNode('el-icon', { class: 'icon el-icon', style: iconStyle.value }, [
          createVNode(resolveComponent(names[1])),
        ])
    } else {
      return () =>
        createVNode(Svg, {
          iconClass: iconClass,
          size: size,
          className: className,
        })
    }
  },
  {
    props: ['className', 'iconClass', 'size', 'color'],
  }
)
</script>
