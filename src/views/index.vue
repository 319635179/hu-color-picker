<template>
  <div><ColorPicker v-model="data" /></div>
  <div><ColorPicker v-model="data" /></div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import ColorPicker from '@/app/index'
import { getStringByLength } from '@/app/utils'

const data = ref('#aaa')
console.log(getStringByLength('1', 2))
defineComponent({
  name: 'Home'
})
</script>

<style scoped></style>
