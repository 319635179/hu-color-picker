<template>
  <div class="hu-color-block" :style="getStyle()"></div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'

const props = defineProps<{
  color?: string
}>()

const getStyle = () => {
  return {
    '--hu-check-color': props.color || 'red'
  }
}

defineComponent({
  name: 'ColorBlock'
})
</script>

<style scoped>
.hu-color-block {
  width: 180px;
  height: 150px;
  background: linear-gradient(to top, #000, #0000), linear-gradient(to right, #fff, var(--hu-check-color, red));
}
</style>