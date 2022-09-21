import { IColor } from './interface'
import { CM, DEF_BG } from './constants'
import { rgba2rgbByMap } from './converts'
import { decomposeRgba, decomposeHexa, decomposeHslaToRgba, decomposeHsvaToRgba } from './decomposes'

// 百分百转数字
const pctToNum = (pct: string): number => (pct.endsWith('%') ? parseFloat(pct) / 100 : parseFloat(pct))

// 获取颜色值的类型
const colorType = (color: string): string => {
  if (color.length < 4) return ''
  if (color.startsWith('#')) {
    return CM.hex
  } else {
    const type = color.toLowerCase().slice(0, 3) || ''
    return CM[type] || ''
  }
}

// 判断颜色值是否含有透明度
const validAlpha = (alpha: number | undefined): boolean => {
  return !alpha || alpha < 1
}

// 重复一次十六进制字符
const doubleHex = (hex: string): string => {
  return hex.replace(/[0-9a-fA-F]/g, m => m + m)
}

const hexEnd = (color: string): string => {
  return color.endsWith('ff') ? color.slice(0, 7) : color
}

// 格式化十六进制颜色值，让其包含rgba
const error = (color: string, value?: any): any => {
  console.error(`【${color}】不是有效的颜色值!  The color value ${color} is invalid!`)
  return value ?? color
}

// 格式化值，保证值在0与max之间
export const fmtVal = (value: number = 0, max: number = 255): number => {
  return Math.max(0, Math.min(value, max))
}

// 格式化值，保证值在0与max之间的整数
export const fmtInt = (value: number, max: number = 255): number => {
  return Math.round(fmtVal(value, max))
}

// 字符串转float 后转int
export const prsFltInt = (value: string, max?: number, def: number = 0): number => {
  return fmtInt(value ? parseFloat(value) : def, max)
}

// 转换alpha通道
export const prsAlpha = (alpha: string, def?: number): number | undefined => {
  return alpha ? fmtVal(pctToNum(alpha), 1) : def
}

// 十六进制转数字
export const hex2num = (hex: string | number | undefined | null): number => {
  return hex == null ? 0 : parseInt(`0x${hex}`)
}

// 数字转为十六进制
export const num2hex = (num: number): string => {
  const val = Number(Math.min(num, 255)).toString(16)
  return val.length === 1 ? `0${val}` : val
}

// 十六进制值转为百分比
export const hexPct = (hex: string | undefined | null): number => {
  return hex == null ? 1 : fmtInt((hex2num(hex) * 100) / 255) / 100
}

// 百分比转化为两位十六进制
export const pctHex = (pct: number): string => {
  return num2hex(fmtInt(pct * 255))
}

// 判断是否为颜色值
export const isColor = (color: string, type?: string): boolean => {
  const cType = colorType(color)
  return !type ? !!cType : cType === type
}

export const formatHex = (color: string): string => {
  color = color.replace(/[^0-9a-fA-F]/g, '') || ''
  color = `#${color.toLowerCase()}`
  switch (color.length) {
    case 4:
      return `${doubleHex(color)}`
    case 5:
      return hexEnd(`${doubleHex(color)}`)
    case 6:
      return hexEnd(`#${doubleHex(color.slice(1, 4))}${color.slice(4)}`)
    case 7:
      return color
    case 8:
      return hexEnd(`${color.slice(0, 7)}${doubleHex(color.slice(7))}`)
    case 9:
      return hexEnd(color)
    default:
      return hexEnd(color.slice(0, 9))
  }
}

// 获取颜色值rgba对象
export const getColorMap = (color: string): IColor => {
  switch (colorType(color)) {
    case CM.rgb:
      return decomposeRgba(color)
    case CM.hex:
      return decomposeHexa(color)
    case CM.hsl:
      return decomposeHslaToRgba(color)
    case CM.hsv:
      return decomposeHsvaToRgba(color)
    default: // 默认rgb
      return decomposeRgba(color)
  }
}

export const callback = (color: string, fn: (map: IColor) => void, errorValue?: any): any => {
  if (isColor(color)) {
    const rgba = getColorMap(color)
    return fn(validAlpha(rgba.a) ? rgba2rgbByMap(rgba) : rgba)
  }
  return error(color, errorValue)
}

export const callback2 = (color: string, fn: (map: IColor) => void, bgColor?: string, errorValue?: any): any => {
  if (isColor(color)) {
    bgColor = bgColor ? (isColor(bgColor) ? bgColor : DEF_BG) : DEF_BG
    const bgRgba = getColorMap(bgColor)
    return fn(rgba2rgbByMap(getColorMap(color), validAlpha(bgRgba.a) ? rgba2rgbByMap(bgRgba) : bgRgba))
  }
  return error(color, errorValue)
}
