import { DEF_BG } from './constants'
import { fmtInt, fmtVal, getColorMap } from './utils'
import { IHsv, IHsl, IColor, ICmy } from './index.d'

// hsl值转化为hsv值
export const hsl2hsv = (hue: number, sat: number, light: number): IHsv => {
  sat = sat / 100
  light = light / 100
  const lightMin = Math.max(light, 0.01)
  let satMin = sat
  light *= 2
  sat *= light <= 1 ? light : 2 - light
  satMin *= lightMin <= 1 ? lightMin : 2 - lightMin
  const value = (light + sat) / 2
  const vSat = light === 0 ? (2 * satMin) / (lightMin + satMin) : (2 * sat) / (light + sat)

  return {
    h: hue,
    s: vSat * 100,
    v: value * 100
  }
}

// hsv值转化为hsl值
export const hsv2hsl = (hue: number, sat: number, value: number): IHsl => {
  sat = sat / 100
  value = value / 100
  const dif = (2 - sat) * value
  const sv = sat * value
  if (dif === 0 || sv === 0) {
    sat = 0
  } else {
    sat = sv / (dif <= 1 ? dif : 2 - dif)
  }
  return {
    h: fmtInt(hue, 360),
    s: fmtInt(100 * sat, 100),
    l: fmtInt((dif / 2) * 100, 100)
  }
}

// rgb值转化为hsv值
export const rgb2hsv = (red: number, green: number, blue: number): IHsv => {
  const min = Math.min(red, green, blue)
  const max = Math.max(red, green, blue)
  const dif = max - min
  const sat = max === 0 ? 0 : (dif / max) * 100
  let hue
  if (max === min) {
    hue = 0
  } else if (red === max) {
    hue = (green - blue) / dif
  } else if (green === max) {
    hue = 2 + (blue - red) / dif
  } else {
    hue = 4 + (red - green) / dif
  }
  hue = Math.min(60 * hue, 360)
  if (hue < 0) {
    hue += 360
  }
  return { h: fmtInt(hue, 360), s: fmtInt(sat, 100), v: fmtInt(((max / 255) * 1e3) / 10, 100) }
}

// hsv值转化为rgb值
export const hsv2rgb = (hue: number, sat: number, value: number): IColor => {
  hue = hue / 60
  sat = sat / 100
  value = value / 100
  const mod = Math.floor(hue) % 6
  const decimal = hue - Math.floor(hue)
  hue = 255 * value * (1 - sat)
  const vsd = (1 - sat * decimal) * value * 255
  sat = 255 * value * (1 - sat * (1 - decimal))
  value *= 255
  switch (mod) {
    case 0:
      return { r: fmtInt(value), g: fmtInt(sat), b: fmtInt(hue) }
    case 1:
      return { r: fmtInt(vsd), g: fmtInt(value), b: fmtInt(hue) }
    case 2:
      return { r: fmtInt(hue), g: fmtInt(value), b: fmtInt(sat) }
    case 3:
      return { r: fmtInt(hue), g: fmtInt(vsd), b: fmtInt(value) }
    case 4:
      return { r: fmtInt(sat), g: fmtInt(hue), b: fmtInt(value) }
    case 5:
    default:
      return { r: fmtInt(value), g: fmtInt(hue), b: fmtInt(vsd) }
  }
}

// hsl值转化为rgb值
export const hsl2rgb = (hue: number, saturation: number, lightness: number): IColor => {
  const hue01 = fmtVal(hue, 360) / 360
  let sat01 = fmtVal(saturation, 100) / 100
  let light01 = fmtVal(lightness, 100) / 100
  if (sat01 === 0) {
    return { r: 255 * light01, g: 255 * light01, b: 255 * light01 }
  }
  sat01 = light01 < 0.5 ? light01 * (1 + sat01) : light01 + sat01 - light01 * sat01
  light01 = 2 * light01 - sat01
  const hsl = [0, 0, 0]
  for (let i = 0; i < hsl.length; i++) {
    let cv = hue01 + (1 / 3) * -(i - 1)
    cv = cv < 0 ? cv + 1 : cv > 1 ? cv - 1 : cv
    if (cv * 6 < 1) {
      cv = light01 + 6 * (sat01 - light01) * cv
    } else if (cv * 2 < 1) {
      cv = sat01
    } else if (cv * 3 < 2) {
      cv = light01 + (sat01 - light01) * (2 / 3 - cv) * 6
    } else {
      cv = light01
    }
    hsl[i] = fmtInt(cv * 255)
  }
  return { r: hsl[0], g: hsl[1], b: hsl[2] }
}

// rgb值转化为hsl值
export const rgb2hsl = (red: number, green: number, blue: number): IHsl => {
  let red01 = fmtVal(red) / 255
  const green01 = fmtVal(green) / 255
  const blue01 = fmtVal(blue) / 255
  const min = Math.min(red01, green01, blue01)
  const max = Math.max(red01, green01, blue01)
  const dif = max - min
  let hue
  if (max === min) {
    hue = 0
  } else if (red01 === max) {
    hue = (green01 - blue01) / dif
  } else if (green01 === max) {
    hue = 2 + (blue01 - red01) / dif
  } else {
    hue = 4 + (red01 - green01) / dif
  }
  hue = Math.min(60 * hue, 360)
  if (hue < 0) {
    hue += 360
  }
  red01 = (min + max) / 2
  const sat = (max === min ? 0 : red01 <= 0.5 ? dif / (max + min) : dif / (2 - max - min)) * 100
  return { h: fmtInt(hue, 360), s: fmtInt(sat, 100), l: fmtInt(100 * red01, 100) }
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
export const rgb2cmy = (r: number, g: number, b: number): IColor => {
  return {
    r: Math.round(100 * fmtVal(1 - r / 255, 1)) || 0,
    g: Math.round(100 * fmtVal(1 - g / 255, 1)) || 0,
    b: Math.round(100 * fmtVal(1 - b / 255, 1)) || 0
  }
}

// 把rgba的颜色值，转化为rgb颜色值
export const rgba2rgb = (color: string, bgColor: string = DEF_BG): IColor => {
  const rgba = getColorMap(color)
  const alpha = rgba.a ?? 1
  const bgMap = getColorMap(bgColor)
  const r = Math.round(rgba.r * alpha + bgMap.r * (1 - alpha))
  const g = Math.round(rgba.g * alpha + bgMap.g * (1 - alpha))
  const b = Math.round(rgba.b * alpha + bgMap.b * (1 - alpha))
  return { r, g, b, a: 1 }
}

// 把有透明度的颜色值转为rgb颜色
export const alpha2rgb = (color: string): IColor => {
  const { r, g, b, a } = getColorMap(color)
  return rgba2rgb(`rgba(${r}, ${g}, ${b}, ${a ?? 1})`, DEF_BG)
}
