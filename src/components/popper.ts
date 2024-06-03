import { commonError } from '@/app/error'
import './popper.less'

const POPPER_ID = 'hu-color-popper'

export const usePopper = () => {
  const initPopper = () => {
    let popper = document.getElementById(POPPER_ID)
    if (!popper) {
      popper = document.createElement('div')
      popper.id = POPPER_ID
      popper.classList.add(POPPER_ID)
      const body = document.getElementsByTagName('body')[0]
      body.appendChild(popper)
    }
    return popper
  }

  const mount = (el?: HTMLElement | null) => {
    if (!el) {
      commonError('error', '元素初始化失败')
      return null
    }
    return initPopper() // popper未初始化时，先初始化
  }

  const unmount = () => {
    // 不需要unmount
  }

  return {
    mount,
    unmount
  }
}
