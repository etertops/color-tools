import { IColor } from './interface'
import { rgba2rgbByMap } from './converts'
import { CM, DEF_BG, REG_EXP_MAP } from './constants'
import { decomposeRgba, decomposeHexa, decomposeHslaToRgba, decomposeHsvaToRgba } from './decomposes'

export const regTest = (value: string, key: string = ''): boolean => {
  const regExp = REG_EXP_MAP[key]
  if (regExp) {
    regExp.lastIndex = 0
    return regExp.test(value)
  }
  return false
}

// 获取默认值，高版es版本，可以用??代替
export const def = (value: any, def: any): any => {
  return value == null ? def : value
}

export const getSplitKey = (string: string): string => {
  return string.includes(',') ? ',' : ' '
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

// 百分百转数字
export const pctToNum = (pct: string): number => (pct.endsWith('%') ? parseFloat(pct) / 100 : parseFloat(pct))

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

// 转化为小写
export const toLow = (color: string = ''): string => {
  return color.toLowerCase()
}

// 删除空格，并转化为小写同意处理
export const deleteSpace = (color: string = ''): string => {
  return toLow(color).replace(/\s+/g, '')
}

// 格式化空格
export const fmtSpace = (color: string = ''): string => {
  return deleteSpace(color).replace(/,/g, ', ').replace(', .', ', 0.')
}

// 获取颜色值的类型
export const colorType = (color: string): string => {
  if (color.length < 4) return ''
  if (color.startsWith('#')) {
    return CM.hex
  } else {
    const type = color.toLowerCase().slice(0, 3) || ''
    return CM[type] || ''
  }
}

// 判断是否为颜色值
export const isColor = (color: string, type?: string): boolean => {
  const cType = colorType(color)
  return !type ? !!cType : cType === type
}

// 判断颜色值是否含有透明度
export const validAlpha = (alpha: number | undefined): boolean => {
  return !alpha || alpha < 1
}

// 重复一次十六进制字符
export const doubleHex = (hex: string): string => {
  return hex.replace(/[0-9a-fA-F]/g, m => m + m)
}

// 格式化十六进制颜色值，让其包含rgba
export const formatHex = (color: string): string | undefined => {
  if (!color.startsWith('#') || color.length < 4) {
    console.error(`${color} 不是正确的十六进制颜色值！`)
    return undefined
  }
  switch (color.length) {
    case 4:
      return `${doubleHex(color)}ff`
    case 5:
      return `${doubleHex(color)}`
    case 6:
      return `#${doubleHex(color.slice(1, 4))}${color.slice(4)}`
    case 7:
      return `${color}ff`
    case 8:
      return `${color.slice(0, 7)}${doubleHex(color.slice(7))}`
    case 9:
      return color
    default:
      return color.slice(0, 9)
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

export const error = (color: string, error?: any): any => {
  console.error(`【${color}】不是有效的颜色值!  The color value ${color} is invalid!`)
  return error ?? color
}

export const callback = (color: string, fn: (map: IColor) => void, error?: any): any => {
  if (isColor(color)) {
    const rgba = getColorMap(color)
    return fn(validAlpha(rgba.a) ? rgba2rgbByMap(rgba) : rgba)
  }
  return error(color, error)
}

export const callback2 = (color: string, fn: (map: IColor) => void, bgColor?: string, error?: any): any => {
  if (isColor(color)) {
    bgColor = bgColor ? (isColor(bgColor) ? bgColor : DEF_BG) : DEF_BG
    const bgRgba = getColorMap(bgColor)
    return fn(rgba2rgbByMap(getColorMap(color), validAlpha(bgRgba.a) ? rgba2rgbByMap(bgRgba) : bgRgba))
  }
  return error(color, error)
}
