/**
 * @description
 * @author wangzh49256
 * @date 2024/5/22 下午7:41
 */

export interface IHuColorPicker {
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  input?: boolean // 启用外部输入框
  tabindex?: string | number
  popperClass?: string // 下拉框类名
  popperId?: string
  validateEvent?: boolean // 是否校验
  label?: string // aria-label
  convert?: boolean // 可转换单色与渐变色
  justGradient?: boolean // 仅启用渐变色，与convert不能同时启用
}

export interface IHuGradientColor {
  direction: number
  colors: IHuGradientItem[]
}

export interface IHuGradientItem {
  color: string
  threshold: number
}