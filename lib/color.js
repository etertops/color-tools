"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lightColor = exports.darkColor = exports.getColorDepth = exports.toHsla = exports.toHsl = exports.toHsva = exports.toHsv = exports.toHexa = exports.toHex = exports.toRgba = exports.toRgb = exports.rgbaToRgb = void 0;
const converts_1 = require("./converts");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
/**
 * RGBA转为RGB
 * RGBA color to RGB
 * @param color RGBA颜色值
 * @param bgColor 背景颜色值，默认白色
 */
const rgbaToRgb = (color, bgColor) => {
    return (0, utils_1.callback2)(color, ({ r, g, b }) => {
        return `rgb(${r}, ${g}, ${b})`;
    }, bgColor);
};
exports.rgbaToRgb = rgbaToRgb;
/**
 * 把颜色值转为RGB
 * The color to RGB
 * @param color 颜色值
 */
const toRgb = (color) => {
    return (0, utils_1.callback)(color, ({ r, g, b }) => {
        return `rgb(${r}, ${g}, ${b})`;
    });
};
exports.toRgb = toRgb;
/**
 * 把颜色值转为RGBA
 * The color to RGBA
 * @param color 颜色值
 * @param alpha 透明度
 */
const toRgba = (color, alpha) => {
    return (0, utils_1.callback)(color, ({ r, g, b }) => {
        return `rgba(${r}, ${g}, ${b}, ${(0, utils_1.fmtInt)(alpha !== null && alpha !== void 0 ? alpha : 1, 1)})`;
    });
};
exports.toRgba = toRgba;
/**
 * 把颜色值转为HEX
 * The color to HEX
 * @param color 颜色值
 */
const toHex = (color) => {
    return (0, utils_1.callback)(color, ({ r, g, b }) => {
        return `#${(0, utils_1.num2hex)(r)}${(0, utils_1.num2hex)(g)}${(0, utils_1.num2hex)(b)}`;
    });
};
exports.toHex = toHex;
/**
 * 把颜色值转为HEXA
 * The color to HEXA
 * @param color 颜色值
 * @param alpha 透明度
 */
const toHexa = (color, alpha) => {
    return (0, utils_1.callback)(color, ({ r, g, b }) => {
        return `#${(0, utils_1.num2hex)(r)}${(0, utils_1.num2hex)(g)}${(0, utils_1.num2hex)(b)}${(0, utils_1.pctHex)(alpha !== null && alpha !== void 0 ? alpha : 1)}`;
    });
};
exports.toHexa = toHexa;
/**
 * 把颜色值转为HSV
 * The color to HSV
 * @param color 颜色值
 */
const toHsv = (color) => {
    return (0, utils_1.callback)(color, ({ r, g, b }) => {
        const { h, s, v } = (0, converts_1.rgb2hsv)({ r, g, b });
        return `hsv(${h}, ${Math.round(s)}%, ${Math.round(v)}%)`;
    });
};
exports.toHsv = toHsv;
/**
 * 把颜色值转为HSVA
 * The color to HSVA
 * @param color 颜色值
 * @param alpha 透明度
 */
const toHsva = (color, alpha) => {
    return (0, utils_1.callback)(color, ({ r, g, b }) => {
        const { h, s, v } = (0, converts_1.rgb2hsv)({ r, g, b });
        return `hsva(${h}, ${Math.round(s)}%, ${Math.round(v)}%, ${alpha !== null && alpha !== void 0 ? alpha : 1})`;
    });
};
exports.toHsva = toHsva;
/**
 * 把颜色值转为HSL
 * The color to HSL
 * @param color 颜色值
 */
const toHsl = (color) => {
    return (0, utils_1.callback)(color, ({ r, g, b }) => {
        const { h, s, l } = (0, converts_1.rgb2hsl)({ r, g, b });
        return `hsl(${h}, ${s}%, ${l}%)`;
    });
};
exports.toHsl = toHsl;
/**
 * 把颜色值转为HSLA
 * The color to HSLA
 * @param color 颜色值
 * @param alpha 透明度
 */
const toHsla = (color, alpha) => {
    return (0, utils_1.callback)(color, ({ r, g, b }) => {
        const { h, s, l } = (0, converts_1.rgb2hsl)({ r, g, b });
        return `hsla(${h}, ${s}%, ${l}%, ${alpha !== null && alpha !== void 0 ? alpha : 1})`;
    });
};
exports.toHsla = toHsla;
/**
 * 获取颜色深度值，值越低深度越高
 * Get color depth value，The lower the value, the higher the depth
 * @param color 颜色值
 */
const getColorDepth = (color) => {
    return (0, utils_1.callback)(color, ({ r, g, b }) => {
        return (0, utils_1.fmtInt)(r * 0.299 + g * 0.587 + b * 0.114);
    }, -1);
};
exports.getColorDepth = getColorDepth;
/**
 * 判断颜色是否是深色
 * Judge whether the color is dark or not
 * @param color 颜色值
 * @param criticalValue 临界值 默认127.5
 */
const darkColor = (color, criticalValue = constants_1.DEF_CRITICAL_VALUE) => {
    const depth = (0, exports.getColorDepth)(color);
    if (depth < 0)
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
const lightColor = (color, criticalValue = constants_1.DEF_CRITICAL_VALUE) => {
    const depth = (0, exports.getColorDepth)(color);
    if (depth < 0)
        return undefined;
    return depth >= criticalValue;
};
exports.lightColor = lightColor;
//# sourceMappingURL=color.js.map