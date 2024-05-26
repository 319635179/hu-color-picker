<template>
  <div :id class="hu-color-container"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  id: string
  parentId: string
}>()
const emits = defineEmits(['unmount'])

let el: HTMLElement | null = null
let parentEl: HTMLElement | null = null

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
  width: 200px;
  height: 200px;
  background: #2286dd;
}
</style>
