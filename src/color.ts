import { rgb2hsv, rgb2hsl } from './converts'
import { DEF_CRITICAL_VALUE } from './constants'
import { fmtInt, callback, callback2, num2hex, pctHex } from './utils'

/**
 * RGBA转为RGB
 * RGBA color to RGB
 * @param color RGBA颜色值
 * @param bgColor 背景颜色值，默认白色
 */
export const rgbaToRgb = (color: string, bgColor?: string): string => {
  return callback2(
    color,
    ({ r, g, b }) => {
      return `rgb(${r}, ${g}, ${b})`
    },
    bgColor
  )
}

/**
 * 把颜色值转为RGB
 * The color to RGB
 * @param color 颜色值
 */
export const toRgb = (color: string): string => {
  return callback(color, ({ r, g, b }) => {
    return `rgb(${r}, ${g}, ${b})`
  })
}

/**
 * 把颜色值转为RGBA
 * The color to RGBA
 * @param color 颜色值
 * @param alpha 透明度
 */
export const toRgba = (color: string, alpha?: number): string => {
  return callback(color, ({ r, g, b }) => {
    return `rgba(${r}, ${g}, ${b}, ${fmtInt(alpha ?? 1, 1)})`
  })
}

/**
 * 把颜色值转为HEX
 * The color to HEX
 * @param color 颜色值
 */
export const toHex = (color: string): string => {
  return callback(color, ({ r, g, b }) => {
    return `#${num2hex(r)}${num2hex(g)}${num2hex(b)}`
  })
}

/**
 * 把颜色值转为HEXA
 * The color to HEXA
 * @param color 颜色值
 * @param alpha 透明度
 */
export const toHexa = (color: string, alpha?: number): string => {
  return callback(color, ({ r, g, b }) => {
    return `#${num2hex(r)}${num2hex(g)}${num2hex(b)}${pctHex(alpha ?? 1)}`
  })
}

/**
 * 把颜色值转为HSV
 * The color to HSV
 * @param color 颜色值
 */
export const toHsv = (color: string): string => {
  return callback(color, ({ r, g, b }) => {
    const { h, s, v } = rgb2hsv({ r, g, b })
    return `hsv(${h}, ${Math.round(s)}%, ${Math.round(v)}%)`
  })
}

/**
 * 把颜色值转为HSVA
 * The color to HSVA
 * @param color 颜色值
 * @param alpha 透明度
 */
export const toHsva = (color: string, alpha?: number): string => {
  return callback(color, ({ r, g, b }) => {
    const { h, s, v } = rgb2hsv({ r, g, b })
    return `hsva(${h}, ${Math.round(s)}%, ${Math.round(v)}%, ${alpha ?? 1})`
  })
}

/**
 * 把颜色值转为HSL
 * The color to HSL
 * @param color 颜色值
 */
export const toHsl = (color: string): string => {
  return callback(color, ({ r, g, b }) => {
    const { h, s, l } = rgb2hsl({ r, g, b })
    return `hsl(${h}, ${s}%, ${l}%)`
  })
}

/**
 * 把颜色值转为HSLA
 * The color to HSLA
 * @param color 颜色值
 * @param alpha 透明度
 */
export const toHsla = (color: string, alpha?: number): string => {
  return callback(color, ({ r, g, b }) => {
    const { h, s, l } = rgb2hsl({ r, g, b })
    return `hsla(${h}, ${s}%, ${l}%, ${alpha ?? 1})`
  })
}

/**
 * 获取颜色灰度值，值越低深度越高
 * Get color depth value，The lower the value, the higher the depth
 * @param color 颜色值
 */
export const getColorGray = (color: string): number => {
  return callback(
    color,
    ({ r, g, b }) => {
      return fmtInt(r * 0.299 + g * 0.587 + b * 0.114)
    },
    -1
  )
}

/**
 * 判断颜色是否是深色
 * Judge whether the color is dark or not
 * @param color 颜色值
 * @param criticalValue 临界值 默认127.5
 */
export const darkColor = (color: string, criticalValue: number = DEF_CRITICAL_VALUE): boolean | undefined => {
  const depth = getColorGray(color)
  if (depth < 0) return undefined
  return depth < criticalValue
}

/**
 * 判断颜色是否是浅色
 * Judge whether the color is light or not
 * @param color 颜色值
 * @param criticalValue 临界值 默认127.5
 */
export const lightColor = (color: string, criticalValue: number = DEF_CRITICAL_VALUE): boolean | undefined => {
  const depth = getColorGray(color)
  if (depth < 0) return undefined
  return depth >= criticalValue
}
