import { hsl2rgb, hsv2rgb } from './converts'
import { IColor, IHsl, IHsv } from './interface'
import { deleteSpace, formatHex, hex2num, hexPct, prsAlpha, prsFltInt } from './utils'

// 分解rgba颜色值
export const decomposeRgba = (color: string): IColor => {
  const [r, g, b, a] = color
    .replace(/(^rgba?)|[()]/gi, '')
    .trim()
    .replace(/[,\s]+/g, ',')
    .split(',')
  return {
    r: prsFltInt(r),
    g: prsFltInt(g),
    b: prsFltInt(b),
    a: prsAlpha(a)
  }
}

// 分解十六进制颜色值
export const decomposeHexa = (color: string): IColor => {
  const c = formatHex(deleteSpace(color)) ?? ''
  return {
    r: hex2num(c.slice(1, 3)),
    g: hex2num(c.slice(3, 5)),
    b: hex2num(c.slice(5, 7)),
    a: hexPct(c.slice(7, 9))
  }
}

// 分解hsl颜色值
export const decomposeHsla = (color: string): IHsl => {
  const [h, s, l, a] = color
    .replace(/(^hsla?)|[()]/gi, '')
    .trim()
    .replace(/[,\s]+/g, ',')
    .split(',')
  return {
    h: prsFltInt(h, 360),
    s: prsFltInt(s, 100),
    l: prsFltInt(l, 100),
    a: prsAlpha(a)
  }
}

// 分解hsl颜色值并转rgb
export const decomposeHslaToRgba = (color: string): IColor => {
  const { h, s, l, a } = decomposeHsla(color)
  const { r, g, b } = hsl2rgb(h, s, l)
  return { r, g, b, a }
}

// 分解hsv颜色值
export const decomposeHsva = (color: string): IHsv => {
  const [h, s, v, a] = deleteSpace(color)
    .replace(/(^hsva?)|[()]/gi, '')
    .trim()
    .replace(/[,\s]+/g, ',')
    .split(',')
  return {
    h: prsFltInt(h, 360),
    s: prsFltInt(s, 100),
    v: prsFltInt(v, 100),
    a: prsAlpha(a)
  }
}

// 分解hsv颜色值并转rgb
export const decomposeHsvaToRgba = (color: string): IColor => {
  const { h, s, v, a } = decomposeHsva(color)
  const { r, g, b } = hsv2rgb(h, s, v)
  return { r, g, b, a }
}
