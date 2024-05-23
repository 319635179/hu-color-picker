<template>
  <div class="hu-color-circle"></div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: 'ColorCircle'
})
</script>

<style scoped lang="less">
.hu-color-circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(#fff 0, #0000 100%), conic-gradient(#f00 0%, #ff0 calc(1 * 100% / 6),
  #ff0 calc(1 * 100% / 6),
  #0f0 calc(2 * 100% / 6),
  #0ff calc(3 * 100% / 6),
  #00f calc(4 * 100% / 6),
  #f0f calc(5 * 100% / 6),
  #f00 calc(6 * 100% / 6));
}
</style>