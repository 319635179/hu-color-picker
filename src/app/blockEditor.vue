<template>
<div class="hu-block-editor">
  <Block />
  <div class="hu-dot"></div>
</div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import Block from '@/components/block.vue'
import type { IHuGradientColor } from '@/app/interface'

const modelValue = defineModel<string | IHuGradientColor>({
  set(val) {
    return val
  }
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