<template>
  <div><ColorPicker v-model="data" /></div>
  <div><ColorPicker v-model="data" /></div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import ColorPicker from '@/app/index'

const data = ref('#fff')

defineComponent({
  name: 'Home'
})
</script>

<style scoped></style>
