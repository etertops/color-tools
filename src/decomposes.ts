import { IColor } from './index.d'
import { hsl2rgb, hsv2rgb } from './converts'
import { deleteSpace, fmtVal, formatHex, hasAlpha, hex2num, hexPct, fmtInt, pctToNum } from './utils'

// 分解rgba颜色值
export const decomposeRgba = (color: string): IColor => {
  const [r, g, b, a] = color
    .trim()
    .replace(/(^rgba?)|[()]/gi, '')
    .trim()
    .replace(/\s+,?\s*/g, ',')
    .split(',')
  return {
    r: fmtInt(r ? parseFloat(r) : 0),
    g: fmtInt(g ? parseFloat(g) : 0),
    b: fmtInt(b ? parseFloat(b) : 0),
    a: a ? fmtVal(pctToNum(a), 1) : undefined
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
export const decomposeHsla = (color: string): IColor => {
  const c = deleteSpace(color)
    .replace(/(^hsla?)|[()%]/gi, '')
    .split(',')
    .map(val => Number(val))
  const a = hasAlpha(color) ? fmtVal(c[3] ?? 1, 1) : 1
  const rgb = hsl2rgb(fmtVal(c[0], 360), fmtVal(c[1], 100), fmtVal(c[2], 100))
  return { ...rgb, a }
}

// 分解hsv颜色值
export const decomposeHsva = (color: string): IColor => {
  const c = deleteSpace(color)
    .replace(/(^hsva?)|[()%]/gi, '')
    .split(',')
    .map(val => Number(val))
  const a = hasAlpha(color) ? fmtVal(c[3] ?? 1, 1) : 1
  const rgb = hsv2rgb(fmtVal(c[0], 360), fmtVal(c[1], 100), fmtVal(c[2], 100))
  return { ...rgb, a }
}
