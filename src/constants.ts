import { IColor } from './interface'

export const DEF_BG = '#ffffffff'
export const DEF_BG_MAP: IColor = { r: 255, g: 255, b: 255 }

export const DEF_CRITICAL_VALUE = 127.5

// color map
export const CM: { [key: string]: string } = {
  rgb: 'rgb',
  hex: 'hex',
  hsv: 'hsv',
  hsl: 'hsl',
  rgba: 'rgba',
  hexa: 'hexa',
  hsva: 'hsva',
  hsla: 'hsla',
  rgb_a: 'rgb_a',
  hex_a: 'hex_a',
  hsv_a: 'hsv_a',
  hsl_a: 'hsl_a'
}

export const REG_EXP_MAP = {
  [CM.rgb_a]: /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*(0?\.\d+|1%?)\s*)?\)$/gi,
  [CM.hex_a]: /^#[0-9a-fA-F]{3,8}$/g,
  [CM.hsv_a]: /^hsva?\(\s*\d{1,3}(deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(,\s*(0?\.\d+|1%?)\s*)?\)$/gi,
  [CM.hsl_a]: /^hsla?\(\s*\d{1,3}(deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(,\s*(0?\.\d+|1%?)\s*)?\)$/gi,
  [CM.rgba]: /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0?\.\d+|1%?)\s*\)$/gi,
  [CM.hexa]: /^#[0-9a-fA-F]{8}$/g,
  [CM.hsva]: /^hsva\(\s*\d{1,3}(deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0?\.\d+|1%?)\s*\)$/gi,
  [CM.hsla]: /^hsla\(\s*\d{1,3}(deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0?\.\d+|1%?)\s*\)$/gi,
  [CM.rgb]: /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/gi,
  [CM.hex]: /^#[0-9a-fA-F]{6}$/g,
  [CM.hsv]: /^hsv\(\s*\d{1,3}(deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/gi,
  [CM.hsl]: /^hsl\(\s*\d{1,3}(deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/gi
}
