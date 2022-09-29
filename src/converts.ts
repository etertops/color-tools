import { CM, DEF_BG, DEF_BG_MAP } from './constants'
import { IColor, IHsv, IHsl, IRgb, ICmy, IHwb, ICmyk } from './interface'
import { fmtInt, fmtVal, getRgbaMap, contains, getColorType, getColorMap } from './utils'

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
  l *= 2
  s *= l <= 1 ? l : 2 - l

  return {
    h: fmtInt(h, 360),
    s: fmtInt(100 * ((2 * s) / (l + s) || 0), 100),
    v: fmtInt(((l + s) / 2) * 100, 100)
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
export const rgb2hsv = ({ r, g, b }: IRgb): IHsv => {
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
export const hsv2rgb = ({ h, s, v }: IHsv): IRgb => {
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
export const hsl2rgb = ({ h, s, l }: IHsl): IRgb => {
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
export const rgb2hsl = ({ r, g, b }: IRgb): IHsl => {
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

// hwb值转化为rgb值
export const hwb2rgb = ({ h, w, b }: IHwb): IRgb => {
  h = h / 360
  w = w / 100
  b = b / 100
  let wb = w + b
  if (wb > 1) {
    w /= wb
    b /= wb
  }
  wb = Math.floor(6 * h)
  b = 1 - b
  h = 6 * h - wb
  if ((wb & 1) !== 0) {
    h = 1 - h
  }
  h = w + h * (b - w)
  h = fmtInt(255 * h)
  b = fmtInt(255 * b)
  w = fmtInt(255 * w)
  switch (wb) {
    case 1:
      return { r: h, g: b, b: w }
    case 2:
      return { r: w, g: b, b: h }
    case 3:
      return { r: w, g: h, b }
    case 4:
      return { r: h, g: w, b }
    case 5:
      return { r: b, g: w, b: h }
    case 6:
    case 0:
    default:
      return { r: b, g: h, b: w }
  }
}

// hwb值转化为hsv值
export const hwb2hsv = ({ h, w, b }: IHwb): IHsv => {
  if (w + b >= 100) {
    return { h: fmtInt(h, 360), s: 0, v: fmtInt((100 * w) / (w + b), 100) }
  } else {
    return { h: fmtInt(h, 360), s: fmtInt(100 - w / (1 - b / 100), 100), v: fmtInt(100 - b, 100) }
  }
}

// hwb值转化为hsl值
export const hwb2hsl = (hwb: IHwb): IHsl => {
  return hsv2hsl(hwb2hsv(hwb))
}

// rgb值转化为hwb值
export const rgb2hwb = ({ r, g, b }: IRgb): IHwb => {
  const { h } = rgb2hsl({ r, g, b })
  const w = fmtInt((100 / 255) * Math.min(r, Math.min(g, b)), 100)
  b = fmtInt(100 - (100 / 255) * Math.max(r, Math.max(g, b)), 100)
  return { h: fmtInt(h, 360), w, b }
}

// hsv值转化为hwb值
export const hsv2hwb = ({ h, s, v }: IHsv): IHwb => {
  return {
    h: fmtInt(h, 360),
    w: v === 0 ? 0 : fmtInt(1 - s / 100, 100),
    b: fmtInt(100 - v, 100)
  }
}

// hsl值转化为hwb值
export const hsl2hwb = (hsl: IHsl): IHwb => {
  return hsv2hwb(hsl2hsv(hsl))
}

// cmy值转化为rgb值
export const cmy2rgb = ({ c, m, y }: ICmy): IRgb => {
  return {
    r: fmtInt(255 * (1 - c / 100)),
    g: fmtInt(255 * (1 - m / 100)),
    b: fmtInt(255 * (1 - y / 100))
  }
}

// rgb值转化为cmy值
export const rgb2cmy = ({ r, g, b }: IRgb): ICmy => {
  return {
    c: fmtInt(100 * (1 - r / 255) || 0, 100),
    m: fmtInt(100 * (1 - g / 255) || 0, 100),
    y: fmtInt(100 * (1 - b / 255) || 0, 100)
  }
}

// cmyk值转化为rgb值
export const cmyk2rgb = ({ c, m, y, k }: ICmyk): IRgb => {
  m = m / 100
  y = y / 100
  k = k / 100
  c = 1 - Math.min(1, (c / 100) * (1 - k) + k)
  m = 1 - Math.min(1, m * (1 - k) + k)
  y = 1 - Math.min(1, y * (1 - k) + k)
  return {
    r: fmtInt(255 * c),
    g: fmtInt(255 * m),
    b: fmtInt(255 * y)
  }
}

// rgb值转化为cmyk值
export const rgb2cmyk = ({ r, g, b }: IRgb): ICmyk => {
  r = r / 255
  g = g / 255
  b = b / 255
  const min = Math.min(1 - r, 1 - g, 1 - b)
  return {
    c: fmtInt(100 * ((1 - r - min) / (1 - min) || 0), 100),
    m: fmtInt(100 * ((1 - g - min) / (1 - min) || 0), 100),
    y: fmtInt(100 * ((1 - b - min) / (1 - min) || 0), 100),
    k: fmtInt(100 * min, 100)
  }
}

// 把rgba的颜色值，转化为rgb颜色值
export const rgba2rgbByMap = (rgba: IRgb, bgMap: IRgb = DEF_BG_MAP): IRgb => {
  const alpha = rgba.a ?? 1
  const r = Math.round(rgba.r * alpha + bgMap.r * (1 - alpha))
  const g = Math.round(rgba.g * alpha + bgMap.g * (1 - alpha))
  const b = Math.round(rgba.b * alpha + bgMap.b * (1 - alpha))
  return { r, g, b, a: undefined }
}

// 把rgba的颜色值，转化为rgb颜色值
export const rgba2rgb = (color: string, bgColor: string = DEF_BG): IRgb => {
  const rgba = getRgbaMap(color)
  const bgMap = getRgbaMap(bgColor)
  return rgba2rgbByMap(rgba, bgMap)
}

// 把有透明度的颜色值转为rgb颜色
export const alpha2rgb = (color: string): IRgb => {
  const { r, g, b, a } = getRgbaMap(color)
  return rgba2rgb(`rgba(${r}, ${g}, ${b}, ${a ?? 1})`, DEF_BG)
}

const convertTo = (color: IColor, method: string): IColor => {
  switch (method) {
    case 'hsv2hsv':
    case 'hsl2hsl':
    case 'rgb2rgb':
    case 'hwb2hwb':
    case 'cmy2cmy':
    case 'cmyk2cmyk':
      return color
    case 'rgb2hsl': // rgb 转其他
      return rgb2hsl(color as IRgb)
    case 'rgb2hsv':
      return rgb2hsv(color as IRgb)
    case 'rgb2hwb':
      return rgb2hwb(color as IRgb)
    case 'rgb2cmy':
      return rgb2cmy(color as IRgb)
    case 'rgb2cmyk':
      return rgb2cmyk(color as IRgb)
    case 'hsl2rgb': // hsl 转其他
      return hsl2rgb(color as IHsl)
    case 'hsl2hsv':
      return hsl2hsv(color as IHsl)
    case 'hsl2hwb':
      return hsl2hwb(color as IHsl)
    case 'hsl2cmy':
      return rgb2cmy(hsl2rgb(color as IHsl))
    case 'hsl2cmyk':
      return rgb2cmyk(hsl2rgb(color as IHsl))
    case 'hsv2rgb': // hsv 转其他
      return hsv2rgb(color as IHsv)
    case 'hsv2hsl':
      return hsv2hsl(color as IHsv)
    case 'hsv2hwb':
      return hsv2hwb(color as IHsv)
    case 'hsv2cmy':
      return rgb2cmy(hsv2rgb(color as IHsv))
    case 'hsv2cmyk':
      return rgb2cmyk(hsv2rgb(color as IHsv))
    case 'hwb2rgb': // hwb 转其他
      return hwb2rgb(color as IHwb)
    case 'hwb2hsl':
      return hwb2hsl(color as IHwb)
    case 'hwb2hsv':
      return hwb2hsv(color as IHwb)
    case 'hwb2cmy':
      return rgb2cmy(hwb2rgb(color as IHwb))
    case 'hwb2cmyk':
      return rgb2cmyk(hwb2rgb(color as IHwb))
    case 'cmy2rgb': // cmy 转其他
      return cmy2rgb(color as ICmy)
    case 'cmy2hsl':
      return rgb2hsl(cmy2rgb(color as ICmy))
    case 'cmy2hsv':
      return rgb2hsv(cmy2rgb(color as ICmy))
    case 'cmy2hwb':
      return rgb2hwb(cmy2rgb(color as ICmy))
    case 'cmy2cmyk':
      return rgb2cmyk(cmy2rgb(color as ICmy))
    case 'cmyk2rgb': // cmyk 转其他
      return cmyk2rgb(color as ICmyk)
    case 'cmyk2hsl':
      return rgb2hsl(cmyk2rgb(color as ICmyk))
    case 'cmyk2hsv':
      return rgb2hsv(cmyk2rgb(color as ICmyk))
    case 'cmyk2hwb':
      return rgb2hwb(cmyk2rgb(color as ICmyk))
    case 'cmyk2cmy':
      return rgb2cmy(cmyk2rgb(color as ICmyk))
    default:
      return color
  }
}

// 颜色值转换
export const convert = (color: string | IColor, target?: string): string | IColor => {
  target = CM[target ?? CM.rgb] || CM.rgb
  if (typeof color === 'string') {
    const type = CM[getColorType(color) ?? '']
    if (type) {
      return convertTo(getColorMap(color), `${type}2${target}`)
    }
  } else if (typeof color === 'object') {
    if (contains(color, ['r', 'g', 'b'])) {
      return convertTo(color, `rgb2${target}`)
    } else if (contains(color, ['h', 's', 'l'])) {
      return convertTo(color, `hsl2${target}`)
    } else if (contains(color, ['h', 's', 'v'])) {
      return convertTo(color, `hsv2${target}`)
    } else if (contains(color, ['h', 'w', 'b'])) {
      return convertTo(color, `hwb2${target}`)
    } else if (contains(color, ['c', 'm', 'y', 'k'])) {
      return convertTo(color, `cmyk2${target}`)
    } else if (contains(color, ['c', 'm', 'y'])) {
      return convertTo(color, `cmy2${target}`)
    }
  }
  return color
}
