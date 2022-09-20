import {
  toRgb,
  toHex,
  toHsv,
  toHsl,
  toRgba,
  toHexa,
  toHsva,
  toHsla,
  rgbaToRgb,
  darkColor,
  lightColor,
  getColorDepth
} from './color'
import { isColor } from './utils'

export default {
  toRgb,
  toHex,
  toHsv,
  toHsl,
  toRgba,
  toHexa,
  toHsva,
  toHsla,
  rgbaToRgb,
  darkColor,
  lightColor,
  getColorDepth,
  version: '1.0.11',
  convert(color: string, target: string): any {
    if (isColor(color)) {
      const key = `to${target[0].toUpperCase()}${target.slice(1).toLowerCase()}`
      // @ts-expect-error
      const fn = tools[key]
      if (typeof fn === 'function') {
        return fn(color)
      }
      return color
    }
    return color
  }
}
