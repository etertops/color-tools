/**
 * RGBA转为RGB
 * RGBA color to RGB
 * @param color RGBA颜色值
 * @param bgColor 背景颜色值，默认白色
 */
export declare const rgbaToRgb: (color: string, bgColor?: string) => string;
/**
 * 把颜色值转为RGB
 * The color to RGB
 * @param color 颜色值
 */
export declare const toRgb: (color: string) => string;
/**
 * 把颜色值转为RGBA
 * The color to RGBA
 * @param color 颜色值
 * @param alpha 透明度
 */
export declare const toRgba: (color: string, alpha?: number) => string;
/**
 * 把颜色值转为HEX
 * The color to HEX
 * @param color 颜色值
 */
export declare const toHex: (color: string) => string;
/**
 * 把颜色值转为HEXA
 * The color to HEXA
 * @param color 颜色值
 * @param alpha 透明度
 */
export declare const toHexa: (color: string, alpha?: number) => string;
/**
 * 把颜色值转为HSV
 * The color to HSV
 * @param color 颜色值
 */
export declare const toHsv: (color: string) => string;
/**
 * 把颜色值转为HSVA
 * The color to HSVA
 * @param color 颜色值
 * @param alpha 透明度
 */
export declare const toHsva: (color: string, alpha?: number) => string;
/**
 * 把颜色值转为HSL
 * The color to HSL
 * @param color 颜色值
 */
export declare const toHsl: (color: string) => string;
/**
 * 把颜色值转为HSLA
 * The color to HSLA
 * @param color 颜色值
 * @param alpha 透明度
 */
export declare const toHsla: (color: string, alpha?: number) => string;
/**
 * 获取颜色灰度值，值越低深度越高
 * Get color depth value，The lower the value, the higher the depth
 * @param color 颜色值
 */
export declare const getColorGray: (color: string) => number;
/**
 * 判断颜色是否是深色
 * Judge whether the color is dark or not
 * @param color 颜色值
 * @param criticalValue 临界值 默认127.5
 */
export declare const darkColor: (color: string, criticalValue?: number) => boolean | undefined;
/**
 * 判断颜色是否是浅色
 * Judge whether the color is light or not
 * @param color 颜色值
 * @param criticalValue 临界值 默认127.5
 */
export declare const lightColor: (color: string, criticalValue?: number) => boolean | undefined;
