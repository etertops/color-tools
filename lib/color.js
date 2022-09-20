"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lightColor = exports.darkColor = exports.getColorDepth = exports.toHsla = exports.toHsl = exports.toHsva = exports.toHsv = exports.toHexa = exports.toHex = exports.toRgba = exports.toRgb = exports.rgbaToRgb = exports.isColor = void 0;
const utils = __importStar(require("./utils"));
const constants_1 = require("./constants");
const converts_1 = require("./converts");
/**
 * 判断是否为颜色值
 * RGBA color to RGB
 * @param color RGBA颜色值
 * @param type 目标类型
 */
const isColor = (color, type) => {
    const colorType = utils.colorType(color);
    return !type ? !!colorType : colorType === type;
};
exports.isColor = isColor;
/**
 * RGBA转为RGB
 * RGBA color to RGB
 * @param color RGBA颜色值
 * @param bgColor 背景颜色值，默认白色
 */
const rgbaToRgb = (color, bgColor = constants_1.DEF_BG) => {
    if (!(0, exports.isColor)(color, constants_1.CM.rgba))
        return color;
    color = utils.toLow(color);
    // 如果 背景颜色有透明度，先先将有透明度的值转为没有透明度的值
    const { r, g, b } = (0, converts_1.rgba2rgb)(color, utils.hasAlpha(bgColor) ? (0, exports.rgbaToRgb)(bgColor) : bgColor);
    return `rgb(${r}, ${g}, ${b})`;
};
exports.rgbaToRgb = rgbaToRgb;
/**
 * 把颜色值转为RGB
 * The color to RGB
 * @param color 颜色值
 */
const toRgb = (color) => {
    if (utils.isRgb(color) || !(0, exports.isColor)(color))
        return utils.fmtSpace(color);
    color = utils.toLow(color);
    const { r, g, b } = utils.hasAlpha(color) ? (0, converts_1.alpha2rgb)(color) : utils.getColorMap(color);
    return `rgb(${r}, ${g}, ${b})`;
};
exports.toRgb = toRgb;
/**
 * 把颜色值转为RGBA
 * The color to RGBA
 * @param color 颜色值
 * @param alpha 透明度
 */
const toRgba = (color, alpha) => {
    var _a;
    if ((utils.isRgba(color) && alpha == null) || !(0, exports.isColor)(color))
        return utils.fmtSpace(color);
    color = utils.toLow(color);
    const { r, g, b, a } = utils.getColorMap(alpha == null ? color : (0, exports.toRgb)(color));
    return `rgba(${r}, ${g}, ${b}, ${(_a = alpha !== null && alpha !== void 0 ? alpha : a) !== null && _a !== void 0 ? _a : 1})`;
};
exports.toRgba = toRgba;
/**
 * 把颜色值转为HEX
 * The color to HEX
 * @param color 颜色值
 */
const toHex = (color) => {
    if (utils.isHex(color) || !(0, exports.isColor)(color))
        return utils.fmtSpace(color);
    color = utils.toLow(color);
    const { r, g, b } = utils.getColorMap((0, exports.toRgb)(color));
    return `#${utils.num2hex(r)}${utils.num2hex(g)}${utils.num2hex(b)}`;
};
exports.toHex = toHex;
/**
 * 把颜色值转为HEXA
 * The color to HEXA
 * @param color 颜色值
 * @param alpha 透明度
 */
const toHexa = (color, alpha) => {
    var _a;
    if ((utils.isHexa(color) && alpha == null) || !(0, exports.isColor)(color))
        return utils.fmtSpace(color);
    color = utils.toLow(color);
    const { r, g, b, a } = utils.getColorMap(alpha == null ? color : (0, exports.toRgb)(color));
    return `#${utils.num2hex(r)}${utils.num2hex(g)}${utils.num2hex(b)}${utils.pctHex((_a = alpha !== null && alpha !== void 0 ? alpha : a) !== null && _a !== void 0 ? _a : 1)}`;
};
exports.toHexa = toHexa;
/**
 * 把颜色值转为HSV
 * The color to HSV
 * @param color 颜色值
 */
const toHsv = (color) => {
    if (utils.isHsv(color) || !(0, exports.isColor)(color))
        return utils.fmtSpace(color);
    color = utils.toLow(color);
    const { r, g, b } = utils.getColorMap((0, exports.toRgb)(color));
    const { h, s, v } = (0, converts_1.rgb2hsv)(r, g, b);
    return `hsv(${h}, ${Math.round(s)}%, ${Math.round(v)}%)`;
};
exports.toHsv = toHsv;
/**
 * 把颜色值转为HSVA
 * The color to HSVA
 * @param color 颜色值
 * @param alpha 透明度
 */
const toHsva = (color, alpha) => {
    var _a;
    if ((utils.isHsva(color) && alpha == null) || !(0, exports.isColor)(color))
        return utils.fmtSpace(color);
    color = utils.toLow(color);
    const { r, g, b, a } = utils.getColorMap(alpha == null ? color : (0, exports.toRgb)(color));
    const { h, s, v } = (0, converts_1.rgb2hsv)(r, g, b);
    return `hsva(${h}, ${Math.round(s)}%, ${Math.round(v)}%, ${(_a = alpha !== null && alpha !== void 0 ? alpha : a) !== null && _a !== void 0 ? _a : 1})`;
};
exports.toHsva = toHsva;
/**
 * 把颜色值转为HSL
 * The color to HSL
 * @param color 颜色值
 */
const toHsl = (color) => {
    if (utils.isHsl(color) || !(0, exports.isColor)(color))
        return utils.fmtSpace(color);
    color = utils.toLow(color);
    const { r, g, b } = utils.getColorMap((0, exports.toRgb)(color));
    const { h, s, l } = (0, converts_1.rgb2hsl)(r, g, b);
    return `hsl(${h}, ${s}%, ${l}%)`;
};
exports.toHsl = toHsl;
/**
 * 把颜色值转为HSLA
 * The color to HSLA
 * @param color 颜色值
 * @param alpha 透明度
 */
const toHsla = (color, alpha) => {
    var _a;
    if ((utils.isHsla(color) && alpha == null) || !(0, exports.isColor)(color))
        return utils.fmtSpace(color);
    color = utils.toLow(color);
    const { r, g, b, a } = utils.getColorMap(alpha == null ? color : (0, exports.toRgb)(color));
    const { h, s, l } = (0, converts_1.rgb2hsl)(r, g, b);
    return `hsla(${h}, ${s}%, ${l}%, ${(_a = alpha !== null && alpha !== void 0 ? alpha : a) !== null && _a !== void 0 ? _a : 1})`;
};
exports.toHsla = toHsla;
/**
 * 获取颜色深度值，值越低深度越高
 * Get color depth value，The lower the value, the higher the depth
 * @param color 颜色值
 */
const getColorDepth = (color) => {
    if (!(0, exports.isColor)(color))
        return undefined;
    color = utils.toLow(color);
    const { r, g, b } = utils.getColorMap((0, exports.toRgb)(color));
    return utils.fmtInt(r * 0.299 + g * 0.587 + b * 0.114);
};
exports.getColorDepth = getColorDepth;
/**
 * 判断颜色是否是深色
 * Judge whether the color is dark or not
 * @param color 颜色值
 * @param criticalValue 临界值 默认127.5
 */
const darkColor = (color, criticalValue = 127.5) => {
    const depth = (0, exports.getColorDepth)(color);
    if (depth == null)
        return undefined;
    return depth < criticalValue;
};
exports.darkColor = darkColor;
/**
 * 判断颜色是否是浅色
 * Judge whether the color is light or not
 * @param color 颜色值
 * @param criticalValue 临界值 默认127.5
 */
const lightColor = (color, criticalValue) => {
    if (!utils.colorType(color))
        return undefined;
    return !(0, exports.darkColor)(color, criticalValue);
};
exports.lightColor = lightColor;
//# sourceMappingURL=color.js.map