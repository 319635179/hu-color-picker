<template>
  <div><ColorPicker v-model="data" convert just-gradient /></div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import ColorPicker from '@/app/index'

const data = ref('adwadwa')

defineComponent({
  name: 'Home'
})
</script>

<style scoped></style>
