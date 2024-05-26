<template>
  <div :id class="hu-color-container" :style="getStyle()">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { commonError } from '@/app/error'

const props = defineProps<{
  id: string
  parentId: string
  rect?: DOMRect
}>()
const emits = defineEmits(['unmount'])

let el: HTMLElement | null = null
let parentEl: HTMLElement | null = null

const getStyle = () => {
  if (!props.rect) {
    commonError('error', '找不到元素位置，请刷新后重试')
    return {}
  }
  return {
    top: `${props.rect.bottom + 8}px`,
    left: `${props.rect.left}px`
  }
}

const handleOutsideUnmount = (e: MouseEvent) => {
  if (!el || !parentEl) {
    emits('unmount')
    return
  }
  const rect = el.getBoundingClientRect()
  const parentRect = parentEl.getBoundingClientRect()
  if (
    e.pageX >= parentRect.left &&
    e.pageX <= parentRect.right &&
    e.pageY >= parentRect.top &&
    e.pageY <= parentRect.bottom
  ) {
    // 点击父元素时，不触发销毁
    return
  }
  if (e.pageX < rect.left || e.pageX > rect.right) {
    emits('unmount')
    return
  }
  if (e.pageY < rect.top || e.pageY > rect.bottom) {
    emits('unmount')
  }
}

onMounted(() => {
  el = document.getElementById(props.id)
  parentEl = document.getElementById(props.parentId)
  document.addEventListener('click', handleOutsideUnmount)
})

onUnmounted(() => {
  // 销毁监听器
  document.removeEventListener('click', handleOutsideUnmount)
  el = null
  parentEl = null
})
</script>

<style scoped lang="less">
.hu-color-container {
  position: absolute;
  width: 220px;
  height: auto;
  border-radius: 3px;
  box-shadow: 0 0 0 1px #d8d8d8 inset;
  background: #fff;
  padding: 10px 0;
}
</style>
