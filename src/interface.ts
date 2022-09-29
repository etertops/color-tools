export interface IColor {
  [key: string]: number | undefined
  a?: number
}

export interface IRgb extends IColor {
  r: number
  g: number
  b: number
}

export interface IHsl extends IColor {
  h: number
  s: number
  l: number
}

export interface IHsv extends IColor {
  h: number
  s: number
  v: number
}

export interface ICmy extends IColor {
  c: number
  m: number
  y: number
}

export interface IHwb extends IColor {
  h: number
  w: number
  b: number
}

export interface ICmyk extends IColor {
  c: number
  m: number
  y: number
  k: number
}

export interface IRgbMap {
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
