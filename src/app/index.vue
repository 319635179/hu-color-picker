<template>
  <div class="hu-color-picker"></div>
  <ColorLine />
  <ColorBlock color="green" />
  <ColorCircle />
</template>

<script setup lang="ts">
import { defineComponent, onMounted } from 'vue'
import type { IHuColorPicker, IHuGradientColor } from './interface'
import { catchError } from './error'
import ColorLine from './line.vue'
import ColorBlock from './block.vue'
import ColorCircle from '@/app/circle.vue'

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
