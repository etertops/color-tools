import { DEF_BG, DEF_BG_MAP } from './constants'
import { fmtInt, fmtVal, getColorMap } from './utils'
import { IHsv, IHsl, IColor, ICmy } from './interface'

// 获取hue值
const getHue = (max: number, min: number, red: number, green: number, blue: number, dif: number): number => {
  if (max === min) {
    return 0
  } else if (red === max) {
    return (green - blue) / dif
  } else if (green === max) {
    return 2 + (blue - red) / dif
  } else {
    return 4 + (red - green) / dif
  }
}

// hsl值转化为hsv值
export const hsl2hsv = ({ h, s, l }: IHsl): IHsv => {
  s = s / 100
  l = l / 100
  const lightMin = Math.max(l, 0.01)
  let satMin = s
  l *= 2
  s *= l <= 1 ? l : 2 - l
  satMin *= lightMin <= 1 ? lightMin : 2 - lightMin
  const value = (l + s) / 2
  const vSat = l === 0 ? (2 * satMin) / (lightMin + satMin) : (2 * s) / (l + s)

  return {
    h: fmtInt(h, 360),
    s: vSat * 100,
    v: value * 100
  }
}

// hsv值转化为hsl值
export const hsv2hsl = ({ h, s, v }: IHsv): IHsl => {
  s = s / 100
  v = v / 100
  const dif = (2 - s) * v
  const sv = s * v
  if (dif === 0 || sv === 0) {
    s = 0
  } else {
    s = sv / (dif <= 1 ? dif : 2 - dif)
  }
  return {
    h: fmtInt(h, 360),
    s: fmtInt(100 * s, 100),
    l: fmtInt((dif / 2) * 100, 100)
  }
}

// rgb值转化为hsv值
export const rgb2hsv = ({ r, g, b }: IColor): IHsv => {
  const min = Math.min(r, g, b)
  const max = Math.max(r, g, b)
  const dif = max - min
  const sat = max === 0 ? 0 : (dif / max) * 100
  let hue = getHue(max, min, r, g, b, dif)
  hue = Math.min(60 * hue, 360)
  if (hue < 0) hue += 360
  return { h: fmtInt(hue, 360), s: fmtInt(sat, 100), v: fmtInt(((max / 255) * 1e3) / 10, 100) }
}

// hsv值转化为rgb值
export const hsv2rgb = ({ h, s, v }: IHsv): IColor => {
  h = h / 60
  s = s / 100
  v = v / 100
  const mod = Math.floor(h) % 6
  const decimal = h - Math.floor(h)
  h = 255 * v * (1 - s)
  const vsd = (1 - s * decimal) * v * 255
  s = 255 * v * (1 - s * (1 - decimal))
  v *= 255
  switch (mod) {
    case 0:
      return { r: fmtInt(v), g: fmtInt(s), b: fmtInt(h) }
    case 1:
      return { r: fmtInt(vsd), g: fmtInt(v), b: fmtInt(h) }
    case 2:
      return { r: fmtInt(h), g: fmtInt(v), b: fmtInt(s) }
    case 3:
      return { r: fmtInt(h), g: fmtInt(vsd), b: fmtInt(v) }
    case 4:
      return { r: fmtInt(s), g: fmtInt(h), b: fmtInt(v) }
    case 5:
    default:
      return { r: fmtInt(v), g: fmtInt(h), b: fmtInt(vsd) }
  }
}

// hsl值转化为rgb值
export const hsl2rgb = ({ h, s, l }: IHsl): IColor => {
  h = fmtVal(h, 360) / 360
  s = fmtVal(s, 100) / 100
  l = fmtVal(l, 100) / 100
  if (s === 0) {
    return { r: 255 * l, g: 255 * l, b: 255 * l }
  }
  s = l < 0.5 ? l * (1 + s) : l + s - l * s
  l = 2 * l - s
  const hsl = [0, 0, 0]
  for (let i = 0; i < hsl.length; i++) {
    let cv = h + (1 / 3) * -(i - 1)
    cv = cv < 0 ? cv + 1 : cv > 1 ? cv - 1 : cv
    if (cv * 6 < 1) {
      cv = l + 6 * (s - l) * cv
    } else if (cv * 2 < 1) {
      cv = s
    } else if (cv * 3 < 2) {
      cv = l + (s - l) * (2 / 3 - cv) * 6
    } else {
      cv = l
    }
    hsl[i] = fmtInt(cv * 255)
  }
  return { r: hsl[0], g: hsl[1], b: hsl[2] }
}

// rgb值转化为hsl值
export const rgb2hsl = ({ r, g, b }: IColor): IHsl => {
  r = fmtVal(r) / 255
  g = fmtVal(g) / 255
  b = fmtVal(b) / 255
  const min = Math.min(r, g, b)
  const max = Math.max(r, g, b)
  const dif = max - min
  let hue = getHue(max, min, r, g, b, dif)
  hue = Math.min(60 * hue, 360)
  if (hue < 0) hue += 360
  r = (min + max) / 2
  const sat = (max === min ? 0 : r <= 0.5 ? dif / (max + min) : dif / (2 - max - min)) * 100
  return { h: fmtInt(hue, 360), s: fmtInt(sat, 100), l: fmtInt(100 * r, 100) }
}

// cmy值转化为rgb值
export const cmy2rgb = (cyan: number, magenta: number, yellow: number): ICmy => {
  return {
    c: Math.round(255 * (1 - fmtVal(cyan / 100, 1))),
    m: Math.round(255 * (1 - fmtVal(magenta / 100, 1))),
    y: Math.round(255 * (1 - fmtVal(yellow / 100, 1)))
  }
}

// rgb值转化为cmy值
export const rgb2cmy = ({ r, g, b }: IColor): IColor => {
  return {
    r: Math.round(100 * fmtVal(1 - r / 255, 1)) || 0,
    g: Math.round(100 * fmtVal(1 - g / 255, 1)) || 0,
    b: Math.round(100 * fmtVal(1 - b / 255, 1)) || 0
  }
}

// 把rgba的颜色值，转化为rgb颜色值
export const rgba2rgbByMap = (rgba: IColor, bgMap: IColor = DEF_BG_MAP): IColor => {
  const alpha = rgba.a ?? 1
  const r = Math.round(rgba.r * alpha + bgMap.r * (1 - alpha))
  const g = Math.round(rgba.g * alpha + bgMap.g * (1 - alpha))
  const b = Math.round(rgba.b * alpha + bgMap.b * (1 - alpha))
  return { r, g, b, a: undefined }
}

// 把rgba的颜色值，转化为rgb颜色值
export const rgba2rgb = (color: string, bgColor: string = DEF_BG): IColor => {
  const rgba = getColorMap(color)
  const bgMap = getColorMap(bgColor)
  return rgba2rgbByMap(rgba, bgMap)
}

// 把有透明度的颜色值转为rgb颜色
export const alpha2rgb = (color: string): IColor => {
  const { r, g, b, a } = getColorMap(color)
  return rgba2rgb(`rgba(${r}, ${g}, ${b}, ${a ?? 1})`, DEF_BG)
}

// 颜色值转换
export const convert = (color: string, source: string, target: string): IColor | IHsl | IHsv => {
  const { r, g, b, a } = getColorMap(color)
  return rgba2rgb(`rgba(${r}, ${g}, ${b}, ${a ?? 1})`, DEF_BG)
}
