<template>
  <div class="hu-color-picker" :id @click="handleShowPopper">
    <div class="hu-color-show" :style="getStyle()"></div>
  </div>
  <teleport v-if="maskEl" :to="maskEl">
    <Transition name="hu-show">
      <Popper
        v-if="showPopper"
        :id="`popper-${id}`"
        :parentId="id"
        @unmount="handleUnmount"
        :rect="getRect()"
      >
        <Editor v-model="modelValue" />
      </Popper>
    </Transition>
  </teleport>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, onUnmounted, type Ref, ref } from 'vue'
import type { IHuColorPicker, IHuGradientColor } from './interface'
import { propsError } from './error'
import { COLOR_BASE, ID_PREFIX } from '@/app/constant'
import { getGradientColor } from '@/app/options'
import { getUniqueId } from '@/app/utils'
import { usePopper } from '@/components/popper'
import Popper from '@/components/popper.vue'
import Editor from '@/app/editor.vue'

const modelValue = defineModel<string | IHuGradientColor>({
  set(val) {
    return val
  }
})

const props = defineProps<IHuColorPicker>()
const id = getUniqueId(ID_PREFIX)
let el: HTMLElement | null = null
const maskEl: Ref<HTMLElement | null> = ref(null)
const showPopper = ref(false)

const { mount } = usePopper()

const getStyle = () => {
  return {
    '--hu-check-color':
      (typeof modelValue.value === 'string'
        ? modelValue.value
        : getGradientColor(modelValue.value)) || COLOR_BASE
  }
}

const getRect = () => {
  return el?.getBoundingClientRect()
}

const handleUnmount = () => {
  if (showPopper.value) {
    showPopper.value = false
  }
}

const handleShowPopper = () => {
  if (!showPopper.value) {
    maskEl.value = mount(el)
    showPopper.value = !!maskEl.value
    return
  }
  handleUnmount()
}

onMounted(() => {
  propsError(props)
  el = document.getElementById(id)
  maskEl.value = mount(el)
})

onUnmounted(() => {
  el = null
  maskEl.value = null
})

defineComponent({
  name: 'ColorPicker'
})
</script>

<style lang="less" scoped>
.hu-show-enter-active,
.hu-show-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.hu-show-enter-from,
.hu-show-leave-from {
  transform: translateY(-30px);
  opacity: 0;
}
</style>
