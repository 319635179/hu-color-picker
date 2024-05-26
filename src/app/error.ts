/**
 * @description
 * @author wangzh49256
 * @date 2024/5/22 下午8:31
 */
import type { IHuColorPicker } from '@/app/interface'

export const propsError = (props: IHuColorPicker) => {
  const res: {
    type: 'success' | 'warn' | 'error',
    message: string,
  } = {
    type: 'success',
    message: ''
  }
  if (props.convert && props.justGradient) {
    res.type = 'warn'
    res.message = "can't use justGradient and convert"
  }
  if(res.type !== 'success') {
    commonError(res.type, res.message)
  }
}

export const commonError = (type: 'warn' | 'error', message: string) => {
  console[type]?.(`hu-color-picker:${type}\n`, message)
}