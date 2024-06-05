<template>
  <div class="hu-color-editor">
    <header class="hu-popper-header">
      <button @click="isGradient = false">单色</button>
    </header>
    <main class="hu-popper-body">
      <BlockEditor v-model:s="hsv.s" v-model:v="hsv.v" :h="hsv.h" />
      <LineEditor class="line" v-model:h="hsv.h" />
    </main>
    <footer class="hu-popper-footer">
      <input class="hu-color-input" v-model="modelValue" />
      {{hsv2rgb(hsv.h, hsv.s, hsv.v)}}<br />
      {{rgb2hsv(hsv2rgb(hsv.h, hsv.s, hsv.v).r, hsv2rgb(hsv.h, hsv.s, hsv.v).g, hsv2rgb(hsv.h, hsv.s, hsv.v).b)}} <br />
      {{hsv}}
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { IHuGradientColor } from '@/app/interface'
import { ref } from 'vue'
import BlockEditor from '@/app/blockEditor.vue'
import LineEditor from '@/app/lineEditor.vue'
import { hsv2rgb, rgb2hsv, str2rgba } from './color'

const modelValue = defineModel<string | IHuGradientColor>({
  set(val) {
    return val
  }
})
const isGradient = ref(false)
const gradientType = ref('line')
console.log(str2rgba('rgba(121, 121,123, 14)'))
console.log(str2rgba('rgb(121, 121,123)'))
console.log(str2rgba('#a1a1aa'))
const hsv = ref({
  s: 100,
  v: 100,
  h: 0
})
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}
.hu-popper-header {
  width: 100%;
  padding: 0 10px;
}
.hu-popper-body {
  width: 100%;
  padding: 8px 10px;
  .line {
    float: right;
  }
}
.hu-popper-footer {
  padding: 0 10px;
  .hu-color-input {
    width: 70px;
  }
}
</style>
