/**
 * @description
 * @author wangzh49256
 * @date 2024/5/22 下午8:31
 */
import type { IHuColorPicker } from '@/app/interface'

export const catchError = (props: IHuColorPicker) => {
  const res = {
    type: 'success',
    message: ''
  }
  if (props.convert && props.justGradient) {
    res.type = 'warn'
    res.message = "can't use justGradient and convert"
  }
  if(res.type === 'warn') {
    console.warn('hu-color-picker:warn\n', res.message)
  }
}