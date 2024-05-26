import { commonError } from '@/app/error'
import { getUniqueId } from '@/app/utils'
import './container.less'

const POPPER_ID = 'hu-color-popper'
const MASK_ID = 'hu-color-mask'

export const useContainer = () => {

  let popper = document.getElementById(POPPER_ID)
  const mask = document.createElement('div')
  mask.id = getUniqueId(MASK_ID)
  mask.classList.add(MASK_ID)

  const initPopper = () => {
    if(!popper) {
      const m = document.createElement('div')
      m.id = POPPER_ID
      m.classList.add(POPPER_ID)
      const body = document.getElementsByTagName('body')[0]
      body.appendChild(m)
      return m
    }
    return popper
  }

  const mount = (el: HTMLElement | null) => {
    if(!el) {
      commonError('error', '元素初始化失败')
      return null
    }
    popper = initPopper() // popper未初始化时，先初始化
    const rect = el.getBoundingClientRect()
    // todo 后续完善定位算法
    mask.style.top = `${rect.bottom + 8}px`
    mask.style.left = `${rect.left}px`
    popper.appendChild(mask)

    return mask
  }

  const unmount = () => {
    if(!popper) {
      // 不存在popper时，mask一定不存在，因此跳出即可
      return
    }
    popper.removeChild(mask)
  }


  return {
    mount,
    unmount
  }
}