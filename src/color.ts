import * as utils from './utils'
import { DEF_BG, CM } from './constants'
import { rgba2rgb, alpha2rgb, rgb2hsv, rgb2hsl } from './converts'

/**
 * 判断是否为颜色值
 * RGBA color to RGB
 * @param color RGBA颜色值
 * @param type 目标类型
 */
export const isColor = (color: string, type?: string): boolean => {
  const colorType = utils.colorType(color)
  return !type ? !!colorType : colorType === type
}

/**
 * RGBA转为RGB
 * RGBA color to RGB
 * @param color RGBA颜色值
 * @param bgColor 背景颜色值，默认白色
 */
export const rgbaToRgb = (color: string, bgColor: string = DEF_BG): string => {
  if (!isColor(color, CM.rgba)) return color
  color = utils.toLow(color)
  // 如果 背景颜色有透明度，先先将有透明度的值转为没有透明度的值
  const { r, g, b } = rgba2rgb(color, utils.hasAlpha(bgColor) ? rgbaToRgb(bgColor) : bgColor)
  return `rgb(${r}, ${g}, ${b})`
}

/**
 * 把颜色值转为RGB
 * The color to RGB
 * @param color 颜色值
 */
export const toRgb = (color: string): string => {
  if (utils.isRgb(color) || !isColor(color)) return utils.fmtSpace(color)
  color = utils.toLow(color)
  const { r, g, b } = utils.hasAlpha(color) ? alpha2rgb(color) : utils.getColorMap(color)
  return `rgb(${r}, ${g}, ${b})`
}

/**
 * 把颜色值转为RGBA
 * The color to RGBA
 * @param color 颜色值
 * @param alpha 透明度
 */
export const toRgba = (color: string, alpha?: number): string => {
  if ((utils.isRgba(color) && alpha == null) || !isColor(color)) return utils.fmtSpace(color)
  color = utils.toLow(color)
  const { r, g, b, a } = utils.getColorMap(alpha == null ? color : toRgb(color))
  return `rgba(${r}, ${g}, ${b}, ${alpha ?? a ?? 1})`
}

/**
 * 把颜色值转为HEX
 * The color to HEX
 * @param color 颜色值
 */
export const toHex = (color: string): string => {
  if (utils.isHex(color) || !isColor(color)) return utils.fmtSpace(color)
  color = utils.toLow(color)
  const { r, g, b } = utils.getColorMap(toRgb(color))
  return `#${utils.num2hex(r)}${utils.num2hex(g)}${utils.num2hex(b)}`
}

/**
 * 把颜色值转为HEXA
 * The color to HEXA
 * @param color 颜色值
 * @param alpha 透明度
 */
export const toHexa = (color: string, alpha?: number): string => {
  if ((utils.isHexa(color) && alpha == null) || !isColor(color)) return utils.fmtSpace(color)
  color = utils.toLow(color)
  const { r, g, b, a } = utils.getColorMap(alpha == null ? color : toRgb(color))
  return `#${utils.num2hex(r)}${utils.num2hex(g)}${utils.num2hex(b)}${utils.pctHex(alpha ?? a ?? 1)}`
}

/**
 * 把颜色值转为HSV
 * The color to HSV
 * @param color 颜色值
 */
export const toHsv = (color: string): string => {
  if (utils.isHsv(color) || !isColor(color)) return utils.fmtSpace(color)
  color = utils.toLow(color)
  const { r, g, b } = utils.getColorMap(toRgb(color))
  const { h, s, v } = rgb2hsv(r, g, b)
  return `hsv(${h}, ${Math.round(s)}%, ${Math.round(v)}%)`
}

/**
 * 把颜色值转为HSVA
 * The color to HSVA
 * @param color 颜色值
 * @param alpha 透明度
 */
export const toHsva = (color: string, alpha?: number): string => {
  if ((utils.isHsva(color) && alpha == null) || !isColor(color)) return utils.fmtSpace(color)
  color = utils.toLow(color)
  const { r, g, b, a } = utils.getColorMap(alpha == null ? color : toRgb(color))
  const { h, s, v } = rgb2hsv(r, g, b)
  return `hsva(${h}, ${Math.round(s)}%, ${Math.round(v)}%, ${alpha ?? a ?? 1})`
}

/**
 * 把颜色值转为HSL
 * The color to HSL
 * @param color 颜色值
 */
export const toHsl = (color: string): string => {
  if (utils.isHsl(color) || !isColor(color)) return utils.fmtSpace(color)
  color = utils.toLow(color)
  const { r, g, b } = utils.getColorMap(toRgb(color))
  const { h, s, l } = rgb2hsl(r, g, b)
  return `hsl(${h}, ${s}%, ${l}%)`
}

/**
 * 把颜色值转为HSLA
 * The color to HSLA
 * @param color 颜色值
 * @param alpha 透明度
 */
export const toHsla = (color: string, alpha?: number): string => {
  if ((utils.isHsla(color) && alpha == null) || !isColor(color)) return utils.fmtSpace(color)
  color = utils.toLow(color)
  const { r, g, b, a } = utils.getColorMap(alpha == null ? color : toRgb(color))
  const { h, s, l } = rgb2hsl(r, g, b)
  return `hsla(${h}, ${s}%, ${l}%, ${alpha ?? a ?? 1})`
}

/**
 * 获取颜色深度值，值越低深度越高
 * Get color depth value，The lower the value, the higher the depth
 * @param color 颜色值
 */
export const getColorDepth = (color: string): number | undefined => {
  if (!isColor(color)) return undefined
  color = utils.toLow(color)
  const { r, g, b } = utils.getColorMap(toRgb(color))
  return utils.fmtInt(r * 0.299 + g * 0.587 + b * 0.114)
}

/**
 * 判断颜色是否是深色
 * Judge whether the color is dark or not
 * @param color 颜色值
 * @param criticalValue 临界值 默认127.5
 */
export const darkColor = (color: string, criticalValue: number = 127.5): boolean | undefined => {
  const depth = getColorDepth(color)
  if (depth == null) return undefined
  return depth < criticalValue
}

/**
 * 判断颜色是否是浅色
 * Judge whether the color is light or not
 * @param color 颜色值
 * @param criticalValue 临界值 默认127.5
 */
export const lightColor = (color: string, criticalValue: number): boolean | undefined => {
  if (!utils.colorType(color)) return undefined
  return !darkColor(color, criticalValue)
}
