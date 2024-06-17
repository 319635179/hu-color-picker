<template>
  <div class="hu-block-editor" @pointerdown="handleChange" @pointerup="handleStopChange" :id="id">
    <Line />
    <div class="hu-dot" :style="getDotStyle()"></div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import Line from '@/components/line.vue'
import { getUniqueId, handleStartMove, handleStopMove } from '@/app/utils'

const LINE_HEIGHT = 150

const h = defineModel<number>('h', { default: 0 })

const getDotStyle = () => {
  return {
    top: `calc(${(h.value) / 3.6}% - 1px)`
  }
}

const id = getUniqueId()
let el: HTMLElement | undefined | null
const getHByEvent = (e: MouseEvent) => {
  const rect = el?.getBoundingClientRect()
  if (!rect) {
    return
  }
  let hVal = ((e.pageY - rect.top) * 360) / LINE_HEIGHT
  hVal = Math.min(360, hVal)
  hVal = Math.max(0, hVal)

  h.value = hVal
}

const handleChange = (e: PointerEvent) => {
  ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  getHByEvent(e)
  handleStartMove(e, (x, y, ev: PointerEvent) => {
    getHByEvent(ev)
  })
}

const handleStopChange = (e: PointerEvent) => {
  ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
  handleStopMove()
}
onMounted(() => {
  el = document.getElementById(id)
})

onUnmounted(() => {
  el = null
})

defineComponent({
  name: 'LineEditor'
})
</script>

<style scoped lang="less">
.hu-block-editor {
  display: inline-block;
  position: relative;
  width: 12px;
  height: 150px;

  .hu-dot {
    position: absolute;
    top: 12px;
    width: 100%;
    height: 3px;
    background: #fff;
    border: 1px solid var(--hu-border-color);
    box-sizing: border-box;
  }
}
</style>