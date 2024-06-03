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
  if(s === 0) {
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
  res.r = Math.floor(res.r * 255)
  res.g = Math.floor(res.g * 255)
  res.b = Math.floor(res.b * 255)
  return res
}
