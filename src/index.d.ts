export interface ITools {
  isColor: Function
  rgbaToRgb: Function
  toRgb: Function
  toRgba: Function
  toHex: Function
  toHexa: Function
  toHsv: Function
  toHsva: Function
  toHsl: Function
  toHsla: Function
  getColorDepth: Function
  darkColor: Function
  lightColor: Function
  [key: string]: any
}

export interface IColor {
  r: number
  g: number
  b: number
  a?: number
}

export interface IHsl {
  h: number
  s: number
  l: number
  a?: number
}

export interface IHsv {
  h: number
  s: number
  v: number
  a?: number
}

export interface ICmy {
  c: number
  m: number
  y: number
  a?: number
}

export interface ICmyk {
  c: number
  m: number
  y: number
  a?: number
}

export interface IColorMap {
  rgb?: string
  hex?: string
  hsv?: string
  hsl?: string
  rgba?: string
  hexa?: string
  hsva?: string
  hsla?: string
  rgb_a?: string
  hex_a?: string
  hsv_a?: string
  hsl_a?: string
}
