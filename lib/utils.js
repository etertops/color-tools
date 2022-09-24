"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contains = exports.callback2 = exports.callback = exports.getRgbaMap = exports.getColorMap = exports.formatColor = exports.formatHsva = exports.formatHsla = exports.formatRgba = exports.formatHex = exports.isColor = exports.pctHex = exports.hexPct = exports.num2hex = exports.hex2num = exports.prsAlpha = exports.prsFltInt = exports.fmtInt = exports.fmtVal = exports.getColorType = void 0;
const constants_1 = require("./constants");
const converts_1 = require("./converts");
const decomposes_1 = require("./decomposes");
// 百分百转数字
const pctToNum = (pct) => (pct.endsWith('%') ? parseFloat(pct) / 100 : parseFloat(pct));
// 获取颜色值的类型
const colorType = (color) => {
    if (color.length < 4)
        return '';
    if (color.startsWith('#')) {
        return constants_1.CM.hex;
    }
    else {
        const type = color.toLowerCase().slice(0, 3) || '';
        return constants_1.CM[type] || '';
    }
};
// 获取颜色值的类型
const getColorType = (color) => {
    return colorType(color);
};
exports.getColorType = getColorType;
// 判断颜色值是否含有透明度
const validAlpha = (alpha) => {
    return !!alpha && alpha < 1 && alpha > 0;
};
// 重复一次十六进制字符
const doubleHex = (hex) => {
    return hex.replace(/[0-9a-fA-F]/g, m => m + m);
};
const hexEnd = (color) => {
    return color.endsWith('ff') ? color.slice(0, 7) : color;
};
// 格式化十六进制颜色值，让其包含rgba
const error = (color, value) => {
    console.error(`【${color}】不是有效的颜色值!  The color value ${color} is invalid!`);
    return value !== null && value !== void 0 ? value : color;
};
// 格式化值，保证值在0与max之间
const fmtVal = (value = 0, max = 255) => {
    return Math.max(0, Math.min(value, max));
};
exports.fmtVal = fmtVal;
// 格式化值，保证值在0与max之间的整数
const fmtInt = (value, max = 255) => {
    return Math.round((0, exports.fmtVal)(value, max));
};
exports.fmtInt = fmtInt;
// 字符串转float 后转int
const prsFltInt = (value, max, def = 0) => {
    return (0, exports.fmtInt)(value ? parseFloat(value) : def, max);
};
exports.prsFltInt = prsFltInt;
// 转换alpha通道
const prsAlpha = (alpha, def) => {
    return alpha ? (0, exports.fmtVal)(pctToNum(alpha), 1) : def;
};
exports.prsAlpha = prsAlpha;
// 十六进制转数字
const hex2num = (hex) => {
    return hex == null ? 0 : parseInt(`0x${hex}`);
};
exports.hex2num = hex2num;
// 数字转为十六进制
const num2hex = (num) => {
    const val = Number(Math.min(num, 255)).toString(16);
    return val.length === 1 ? `0${val}` : val;
};
exports.num2hex = num2hex;
// 十六进制值转为百分比
const hexPct = (hex) => {
    return hex == null ? 1 : (0, exports.fmtInt)(((0, exports.hex2num)(hex) * 100) / 255) / 100;
};
exports.hexPct = hexPct;
// 百分比转化为两位十六进制
const pctHex = (pct) => {
    return (0, exports.num2hex)((0, exports.fmtInt)(pct * 255));
};
exports.pctHex = pctHex;
// 判断是否为颜色值
const isColor = (color, type) => {
    const cType = colorType(color);
    return !type ? !!cType : cType === type;
};
exports.isColor = isColor;
const formatHex = (color) => {
    color = color.replace(/[^0-9a-fA-F]/g, '') || '';
    color = `#${color.toLowerCase()}`;
    switch (color.length) {
        case 1:
            return `${doubleHex('#000')}`;
        case 2:
            return `${doubleHex(color + '00')}`;
        case 3:
            return `${doubleHex(color + '0')}`;
        case 4:
            return `${doubleHex(color)}`;
        case 5:
            return hexEnd(`${doubleHex(color)}`);
        case 6:
            return hexEnd(`#${doubleHex(color.slice(1, 4))}${color.slice(4)}`);
        case 7:
            return color;
        case 8:
            return hexEnd(`${color.slice(0, 7)}${doubleHex(color.slice(7))}`);
        case 9:
            return hexEnd(color);
        default:
            return hexEnd(color.slice(0, 9));
    }
};
exports.formatHex = formatHex;
const formatRgba = (color) => {
    const { r, g, b, a } = (0, decomposes_1.decomposeRgba)(color);
    const va = validAlpha(a);
    const alpha = va ? `, ${a}` : '';
    return `rgb${va ? 'a' : ''}(${r}, ${g}, ${b}${alpha})`;
};
exports.formatRgba = formatRgba;
const formatHsla = (color) => {
    const { h, s, l, a } = (0, decomposes_1.decomposeHsla)(color);
    const va = validAlpha(a);
    const alpha = va ? `, ${a}` : '';
    return `hsl${va ? 'a' : ''}(${h}, ${s}%, ${l}%${alpha})`;
};
exports.formatHsla = formatHsla;
const formatHsva = (color) => {
    const { h, s, v, a } = (0, decomposes_1.decomposeHsva)(color);
    const va = validAlpha(a);
    const alpha = va ? `, ${a}` : '';
    return `hsv${va ? 'a' : ''}(${h}, ${s}%, ${v}%${alpha})`;
};
exports.formatHsva = formatHsva;
const formatColor = (color) => {
    color = color.trim().toLowerCase();
    const match = color.match(/(^#)|(^rgba?)|(^hsla?)|(^hsva?)/gi);
    switch (match ? match[0] : '') {
        case '#':
            return (0, exports.formatHex)(color);
        case 'rgb':
        case 'rgba':
            return (0, exports.formatRgba)(color);
        case 'hsl':
        case 'hsla':
            return (0, exports.formatHsla)(color);
        case 'hsv':
        case 'hsva':
            return (0, exports.formatHsva)(color);
        default:
            return color;
    }
};
exports.formatColor = formatColor;
// 获取颜色值rgba对象
const getColorMap = (color) => {
    switch (colorType(color)) {
        case constants_1.CM.rgb:
            return (0, decomposes_1.decomposeRgba)(color);
        case constants_1.CM.hex:
            return (0, decomposes_1.decomposeHexa)(color);
        case constants_1.CM.hsl:
            return (0, decomposes_1.decomposeHsla)(color);
        case constants_1.CM.hsv:
            return (0, decomposes_1.decomposeHsva)(color);
        default: // 默认rgb
            return (0, decomposes_1.decomposeRgba)(color);
    }
};
exports.getColorMap = getColorMap;
// 获取颜色值rgba对象
const getRgbaMap = (color) => {
    switch (colorType(color)) {
        case constants_1.CM.rgb:
            return (0, decomposes_1.decomposeRgba)(color);
        case constants_1.CM.hex:
            return (0, decomposes_1.decomposeHexa)(color);
        case constants_1.CM.hsl:
            return (0, decomposes_1.decomposeHslaToRgba)(color);
        case constants_1.CM.hsv:
            return (0, decomposes_1.decomposeHsvaToRgba)(color);
        default: // 默认rgb
            return (0, decomposes_1.decomposeRgba)(color);
    }
};
exports.getRgbaMap = getRgbaMap;
const callback = (color, fn, errorValue) => {
    if ((0, exports.isColor)(color)) {
        const rgba = (0, exports.getRgbaMap)(color);
        return fn(validAlpha(rgba.a) ? (0, converts_1.rgba2rgbByMap)(rgba) : rgba);
    }
    return error(color, errorValue);
};
exports.callback = callback;
const callback2 = (color, fn, bgColor, errorValue) => {
    if ((0, exports.isColor)(color)) {
        bgColor = bgColor ? ((0, exports.isColor)(bgColor) ? bgColor : constants_1.DEF_BG) : constants_1.DEF_BG;
        const bgRgba = (0, exports.getRgbaMap)(bgColor);
        return fn((0, converts_1.rgba2rgbByMap)((0, exports.getRgbaMap)(color), validAlpha(bgRgba.a) ? (0, converts_1.rgba2rgbByMap)(bgRgba) : bgRgba));
    }
    return error(color, errorValue);
};
exports.callback2 = callback2;
const contains = (object, keys) => {
    let flag = true;
    keys.forEach(key => {
        flag = flag && object[key] != null;
    });
    return flag;
};
exports.contains = contains;
//# sourceMappingURL=utils.js.map