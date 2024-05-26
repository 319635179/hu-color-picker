<template>
  <div class="hu-color-picker" :id @click="handleShowContainer">
    <div class="hu-color-show" :style="getStyle()"></div>
  </div>
  <teleport v-if="maskEl" :to="maskEl">
    <Container v-if="showContainer" :id="`container-${id}`" :parentId="id" @unmount="handleUnmount" />
  </teleport>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, onUnmounted, type Ref, ref } from 'vue'
import type { IHuColorPicker, IHuGradientColor } from './interface'
import { propsError } from './error'
import { COLOR_BASE, ID_PREFIX } from '@/app/constant'
import { getGradientColor } from '@/app/options'
import { getUniqueId } from '@/app/utils'
import { useContainer } from '@/components/container'
import Container from '@/components/container.vue'

const modelValue = defineModel<string | IHuGradientColor>({
  set(val) {
    return val
  }
})

const props = defineProps<IHuColorPicker>()
const id = getUniqueId(ID_PREFIX)
let el: HTMLElement | null = null
const maskEl: Ref<HTMLElement | null> = ref(null)
const showContainer = ref(false)

const { mount, unmount } = useContainer()

const getStyle = () => {
  return {
    '--hu-check-color':
      (typeof modelValue.value === 'string'
        ? modelValue.value
        : getGradientColor(modelValue.value)) || COLOR_BASE
  }
}

const handleUnmount = () => {
  if(showContainer.value) {
    unmount()
    showContainer.value = false
  }
}

const handleShowContainer = () => {
  if (!showContainer.value) {
    maskEl.value = mount(el)
    showContainer.value = !!maskEl.value;
    return
  }
  handleUnmount()
}

onMounted(() => {
  propsError(props)
  el = document.getElementById(id)
})

onUnmounted(() => {
  el = null
  maskEl.value = null
})

defineComponent({
  name: 'ColorPicker'
})
</script>
