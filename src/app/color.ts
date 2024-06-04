/**
 * @description color.ts
 * @author wangzh49256
 * @date 2024/6/3 下午7:58
 */

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
