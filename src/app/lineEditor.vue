<template>
  <div class="hu-block-editor">
    <Line />
    <div class="hu-dot"></div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import type { IHuGradientColor } from '@/app/interface'
import Line from '@/components/line.vue'

const modelValue = defineModel<string | IHuGradientColor>({
  set(val) {
    return val
  }
})

defineComponent({
  name: 'LineEditor'
})
</script>

<style scoped lang="less">
.hu-block-editor {
  display: inline-block;
  position: relative;

  .hu-dot {
    position: absolute;
    top: 12px;
    width: 100%;
    height: 1px;
    background: #000;
  }
}
</style>