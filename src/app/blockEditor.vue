<template>
  <div class="hu-block-editor" @pointerdown="handleChange" @pointerup="handleStopChange" :id="id">
    <Block :color="getBlockColor()" />
    <div class="hu-dot" :style="getDotStyle()"></div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import Block from '@/components/block.vue'
import { getUniqueId, handleStartMove, handleStopMove } from '@/app/utils'
import { hsv2rgb } from '@/app/color'

const s = defineModel<number>('s', { default: 100 })
const v = defineModel<number>('v', { default: 100 })

const props = defineProps<{
  h: number
}>()

const getBlockColor = () => {
  const rgb = hsv2rgb(props.h, 100, 100)
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
}

const BLOCK_WIDTH = 180
const BLOCK_HEIGHT = 150

const id = getUniqueId()
let el: HTMLElement | undefined | null
const getDotStyle = () => {
  return {
    top: `calc(${100 - v.value}% - 3px)`,
    left: `calc(${s.value}% - 3px)`
  }
}

const getSVByEvent = (e: PointerEvent) => {
  const rect = el?.getBoundingClientRect()
  if (!rect) {
    return
  }
  let sVal = ((e.pageX - rect.left) * 100) / BLOCK_WIDTH
  let vVal = ((BLOCK_HEIGHT - e.pageY + rect.top) * 100) / BLOCK_HEIGHT
  sVal = Math.min(100, sVal)
  sVal = Math.max(0, sVal)
  vVal = Math.min(100, vVal)
  vVal = Math.max(0, vVal)

  s.value = sVal
  v.value = vVal
}

const handleChange = (e: PointerEvent) => {
  ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  getSVByEvent(e)
  handleStartMove(e, (x, y, ev: PointerEvent) => {
    getSVByEvent(ev)
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
  name: 'BlockEditor'
})
</script>

<style scoped lang="less">
.hu-block-editor {
  display: inline-block;
  position: relative;
  width: 180px;
  height: 150px;
  cursor: pointer;

  .hu-dot {
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid #000;
    box-sizing: border-box;
    top: -3px;
    left: -3px;
  }
}
</style>
