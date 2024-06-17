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
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { IHuGradientColor } from '@/app/interface'
import { onMounted, ref, watch } from 'vue'
import BlockEditor from '@/app/blockEditor.vue'
import LineEditor from '@/app/lineEditor.vue'
import { hexStr2rgb, hsv2rgb, rgb2hex, rgb2hsv } from './color'

const modelValue = defineModel<string | IHuGradientColor>({
  set(val) {
    return val
  }
})
const hsv = ref({
  s: 100,
  v: 100,
  h: 0
})
const a = ref(100)
const isGradient = ref(false)
const gradientType = ref('line')

const setHsv = () => {
  console.log(
    typeof modelValue.value === 'string' && [4, 5, 7, 9].includes(modelValue.value.length),
    hsv.value
  )
  if (typeof modelValue.value === 'string' && [4, 5, 7, 9].includes(modelValue.value.length)) {
    const rgb = hexStr2rgb(modelValue.value)
    hsv.value = rgb2hsv(rgb.r, rgb.g, rgb.b)
    a.value = rgb.a
  }
}

const hasChangeByHsv = ref(false)
const hasChangeByData = ref(false)

onMounted(() => {
  watch(
    hsv,
    (val) => {
      if (!hasChangeByData.value) {
        const rgb = hsv2rgb(val.h, val.s, val.v)
        modelValue.value = rgb2hex(rgb.r, rgb.g, rgb.b, 100)
        hasChangeByHsv.value = true
      } else {
        hasChangeByData.value = false
      }
    },
    { deep: true }
  )

  watch(
    modelValue,
    () => {
      if (!hasChangeByHsv.value) {
        setHsv()
        hasChangeByData.value = true
      } else {
        hasChangeByHsv.value = false
      }
    },
    {
      immediate: true
    }
  )
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
