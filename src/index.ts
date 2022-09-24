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
import { convert } from './converts'
import { isColor, formatColor, getColorMap } from './utils'

export default {
  toRgb,
  toHex,
  toHsv,
  toHsl,
  toRgba,
  toHexa,
  toHsva,
  toHsla,
  isColor,
  convert,
  rgbaToRgb,
  darkColor,
  lightColor,
  getColorMap,
  formatColor,
  getColorDepth,
  version: '1.0.12-alpha.1'
}
