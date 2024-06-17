import { ref, type Ref } from 'vue'

let uniqueId = 0

export const INTERVAL_TIME = 30
export const getUniqueId = (prefix?: string) => {
  return String(prefix ? `${prefix}__${uniqueId++}` : uniqueId++)
}

export const moveTimer: Ref<any> = ref()
export const handleStartMove = (e: MouseEvent, callback: (x: number, y: number, ev?: PointerEvent) => any) => {
  let lastX = e.clientX
  let lastY = e.clientY
  let lastTime = 0
  document.onpointermove = (event: PointerEvent) => {
    if (event.timeStamp - lastTime >= INTERVAL_TIME) {
      // lodash的节流函数偶然会在执行停止后多执行一次，易触发bug，因此手写节流
      lastTime = event.timeStamp
      // showModuleEditor.value = false
      const moveX = event.clientX - lastX
      const moveY = event.clientY - lastY
      callback(moveX, moveY, event)
      lastX = event.clientX
      lastY = event.clientY
    }
    clearTimeout(moveTimer.value)
    moveTimer.value = setTimeout(() => {
      const moveX = event.clientX - lastX
      const moveY = event.clientY - lastY
      callback(moveX, moveY, event)
      lastX = event.clientX
      lastY = event.clientY
    }, INTERVAL_TIME)
  }
}

export const handleStopMove = () => {
  clearTimeout(moveTimer.value)
  document.onpointermove = null
}

export const getStringByLength = (str: string, len: number) => {
  const l = str.length
  if(l >= len) {
    return str
  }
  return new Array(len - l + 1).join('0') + str
}
