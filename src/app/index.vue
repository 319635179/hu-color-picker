<template>
  <div class="hu-color-picker"></div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted } from 'vue'
import type { IHuColorPicker, IHuGradientColor } from '@/app/interface'
import { catchError } from '@/app/error'

const modelValue = defineModel<string | IHuGradientColor>({
  set(val) {
    return val
  }
})

const props = defineProps<IHuColorPicker>()

onMounted(() => {
  catchError(props)
})

defineComponent({
  name: 'ColorPicker'
})
</script>

<style scoped lang="less">
.hu-color-picker {
  position: relative;
  width: 30px;
  height: 30px;
  border: 1px solid #706e6e;
  border-radius: 5px;
}
</style>