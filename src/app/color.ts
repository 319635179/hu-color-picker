/**
 * @description color.ts
 * @author wangzh49256
 * @date 2024/6/3 下午7:58
 */
import { commonError } from '@/app/error'

export const hsv2rgb = (h: number, s: number, v: number) => {
  h = Math.floor(h) % 360
  s /= 100
  v /= 100
  const i = Math.floor(h / 60)
  const f = h / 60 - i
  const res = { r: 0, g: 0, b: 0 }
  const a = v * (1 - s)
  const b = v * (1 - s * f)
  const c = v * (1 - s * (1 - f))
  if (s === 0) {
    res.r = v
    res.g = v
    res.b = v
  } else {
    switch (i) {
      case 0:
        res.r = v
        res.g = c
        res.b = a
        break
      case 1:
        res.r = b
        res.g = v
        res.b = a
        break
      case 2:
        res.r = a
        res.g = v
        res.b = c
        break
      case 3:
        res.r = a
        res.g = b
        res.b = v
        break
      case 4:
        res.r = c
        res.g = a
        res.b = v
        break
      case 5:
        res.r = v
        res.g = a
        res.b = b
        break
    }
  }
  res.r = res.r * 255
  res.g = res.g * 255
  res.b = res.b * 255
  return res
}

export const rgb2hsv = (r: number, g: number, b: number) => {
  r = r / 255
  g = g / 255
  b = b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s: number
  let v = max

  const d = max - min
  if (d === 0) {
    h = 0 // achromatic
    s = 0
  } else {
    s = d / max
    if (max === r) {
      h = (g - b) / d + (g < b ? 6 : 0)
    } else if (max === g) {
      h = (b - r) / d + 2
    } else if (max === b) {
      h = (r - g) / d + 4
    }
    h /= 6
  }

  return {
    h: h * 360,
    s: s * 100,
    v: v * 100
  }
}

const defaultRGBA = {r: 0, g: 0, b: 0, a: 0}
const strError = () => {
  commonError('error', '字符串格式错误')
  return defaultRGBA
}
const dbStr = (str: string) => {
  let res = ''
  for(let i = 0; i < str.length; i++) {
    res += str[i]
    res += str[i]
  }
  return res
}

export const rgbStr2rgb = (str: string) => {
  const index = str.indexOf('(')
  if(index === -1 || str[str.length-1] !== ')') {
    return strError()
  }
  const arr = str.slice(index + 1, -1).split(',').map(num => Number(num));
  if(arr.indexOf(NaN) !== -1) {
    return strError()
  }
  return {
    r: arr[0],
    g: arr[1],
    b: arr[2],
    a: arr[3] || 100
  }
}
export const hexStr2rgb = (str: string) => {
  str = str.slice(1)
  switch (str.length) {
    case 3:
    case 4:
      str = dbStr(str)
      break
    case 6:
    case 8:
      break
    default:
      return strError()
  }
  const rStr = str.slice(0, 2).toLowerCase()
  const gStr = str.slice(2, 4).toLowerCase()
  const bStr = str.slice(4, 6).toLowerCase()
  const aStr = str.length === 8 ? str.slice(6, 8) : 'ff'
  return {
    r: parseInt(rStr, 16),
    g: parseInt(gStr, 16),
    b: parseInt(bStr, 16),
    a: parseInt(aStr, 16),
  }
}
export const str2rgba = (str: string) => {
  str = str.split(' ').join('')
  if(str.slice(0,3) === 'rgb') {
    return rgbStr2rgb(str)
  }

  if(str[0] === '#') {
    return hexStr2rgb(str)
  }
}
