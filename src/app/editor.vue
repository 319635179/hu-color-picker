<template>
  <div class="hu-color-editor">
    <header class="hu-popper-header">
      <button @click="isGradient = false">单色</button>
    </header>
    <main class="hu-popper-body">
      <BlockEditor />
      <LineEditor class="line" />
    </main>
    <footer class="hu-popper-footer">
      <input class="hu-color-input" v-model="modelValue" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { IHuGradientColor } from '@/app/interface'
import { ref } from 'vue'
import BlockEditor from '@/app/blockEditor.vue'
import LineEditor from '@/app/lineEditor.vue'

const modelValue = defineModel<string | IHuGradientColor>({
  set(val) {
    return val
  }
})
const isGradient = ref(false)
const gradientType = ref('line')
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
