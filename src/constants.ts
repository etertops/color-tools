import { IColor } from './interface'

export const DEF_BG = '#ffffffff'
export const DEF_BG_MAP: IColor = { r: 255, g: 255, b: 255 }

export const DEF_CRITICAL_VALUE = 127.5

// color map
export const CM: { [key: string]: string } = {
  rgb: 'rgb',
  hex: 'hex',
  hsv: 'hsv',
  hsl: 'hsl'
}

export const REG_EXP_MAP: { [key: string]: RegExp } = {
  rgb_a: /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*(0?\.\d+|1%?)\s*)?\)$/gi,
  hex_a: /^#[0-9a-fA-F]{3,8}$/g,
  hsv_a: /^hsva?\(\s*\d{1,3}(deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(,\s*(0?\.\d+|1%?)\s*)?\)$/gi,
  hsl_a: /^hsla?\(\s*\d{1,3}(deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(,\s*(0?\.\d+|1%?)\s*)?\)$/gi,
  rgba: /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0?\.\d+|1%?)\s*\)$/gi,
  hexa: /^#[0-9a-fA-F]{8}$/g,
  hsva: /^hsva\(\s*\d{1,3}(deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0?\.\d+|1%?)\s*\)$/gi,
  hsla: /^hsla\(\s*\d{1,3}(deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0?\.\d+|1%?)\s*\)$/gi,
  rgb: /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/gi,
  hex: /^#[0-9a-fA-F]{6}$/g,
  hsv: /^hsv\(\s*\d{1,3}(deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/gi,
  hsl: /^hsl\(\s*\d{1,3}(deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/gi
}
