"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHsla = exports.isHsva = exports.isHexa = exports.isRgba = exports.isHsl = exports.isHsv = exports.isHex = exports.isRgb = exports.getColorMap = exports.formatHex = exports.doubleHex = exports.hasAlpha = exports.colorType = exports.fmtSpace = exports.deleteSpace = exports.toLow = exports.pctHex = exports.hexPct = exports.num2hex = exports.hex2num = exports.fmtInt = exports.fmtVal = exports.def = exports.regTest = void 0;
const constants_1 = require("./constants");
const decomposes_1 = require("./decomposes");
const regTest = (value, key = '') => {
    const regExp = constants_1.REG_EXP_MAP[key];
    if (regExp) {
        regExp.lastIndex = 0;
        return regExp.test(value);
    }
    return false;
};
exports.regTest = regTest;
// 获取默认值，高版es版本，可以用??代替
const def = (value, def) => {
    return value == null ? def : value;
};
exports.def = def;
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
// 转化为小写
const toLow = (color = '') => {
    return color.toLowerCase();
};
exports.toLow = toLow;
// 删除空格，并转化为小写同意处理
const deleteSpace = (color = '') => {
    return (0, exports.toLow)(color).replace(/\s+/g, '');
};
exports.deleteSpace = deleteSpace;
// 格式化空格
const fmtSpace = (color = '') => {
    return (0, exports.deleteSpace)(color).replace(/,/g, ', ').replace(', .', ', 0.');
};
exports.fmtSpace = fmtSpace;
// 获取颜色值的类型
const colorType = (color) => {
    if (color.length < 4)
        return '';
    const lower = (0, exports.toLow)(color);
    if ((0, exports.regTest)(lower, constants_1.CM.rgb_a)) {
        return lower.startsWith(constants_1.CM.rgba) ? constants_1.CM.rgba : constants_1.CM.rgb;
    }
    else if ((0, exports.regTest)(color, constants_1.CM.hex_a)) {
        return color.length === 4 || color.length === 7 ? constants_1.CM.hex : constants_1.CM.hexa;
    }
    else if ((0, exports.regTest)(lower, constants_1.CM.hsv_a)) {
        return lower.startsWith(constants_1.CM.hsva) ? constants_1.CM.hsva : constants_1.CM.hsv;
    }
    else if ((0, exports.regTest)(lower, constants_1.CM.hsl_a)) {
        return lower.startsWith(constants_1.CM.hsla) ? constants_1.CM.hsla : constants_1.CM.hsl;
    }
    else {
        return '';
    }
};
exports.colorType = colorType;
// 判断颜色值是否含有透明度
const hasAlpha = (color) => {
    return /a$/.test((0, exports.colorType)(color));
};
exports.hasAlpha = hasAlpha;
// 重复一次十六进制字符
const doubleHex = (hex) => {
    return hex.replace(/[0-9a-fA-F]/g, m => m + m);
};
exports.doubleHex = doubleHex;
// 格式化十六进制颜色值，让其包含rgba
const formatHex = (color) => {
    if (!color.startsWith('#') || color.length < 4) {
        console.error(`${color} 不是正确的十六进制颜色值！`);
        return undefined;
    }
    switch (color.length) {
        case 4:
            return `${(0, exports.doubleHex)(color)}ff`;
        case 5:
            return `${(0, exports.doubleHex)(color)}`;
        case 6:
            return `#${(0, exports.doubleHex)(color.slice(1, 4))}${color.slice(4)}`;
        case 7:
            return `${color}ff`;
        case 8:
            return `${color.slice(0, 7)}${(0, exports.doubleHex)(color.slice(7))}`;
        case 9:
            return color;
        default:
            return color.slice(0, 9);
    }
};
exports.formatHex = formatHex;
// 获取颜色值rgba对象
const getColorMap = (color) => {
    switch ((0, exports.colorType)(color)) {
        case constants_1.CM.rgb:
        case constants_1.CM.rgba:
            return (0, decomposes_1.decomposeRgba)(color);
        case constants_1.CM.hex:
        case constants_1.CM.hexa:
            return (0, decomposes_1.decomposeHexa)(color);
        case constants_1.CM.hsl:
        case constants_1.CM.hsla:
            return (0, decomposes_1.decomposeHsla)(color);
        case constants_1.CM.hsv:
        case constants_1.CM.hsva:
            return (0, decomposes_1.decomposeHsva)(color);
        default: // 默认rgb
            return (0, decomposes_1.decomposeRgba)(color);
    }
};
exports.getColorMap = getColorMap;
const isRgb = (color) => (0, exports.regTest)((0, exports.toLow)(color), constants_1.CM.rgb);
exports.isRgb = isRgb;
const isHex = (color) => (0, exports.regTest)((0, exports.toLow)(color), constants_1.CM.hex);
exports.isHex = isHex;
const isHsv = (color) => (0, exports.regTest)((0, exports.toLow)(color), constants_1.CM.hsv);
exports.isHsv = isHsv;
const isHsl = (color) => (0, exports.regTest)((0, exports.toLow)(color), constants_1.CM.hsl);
exports.isHsl = isHsl;
const isRgba = (color) => (0, exports.regTest)((0, exports.toLow)(color), constants_1.CM.rgba);
exports.isRgba = isRgba;
const isHexa = (color) => (0, exports.regTest)((0, exports.toLow)(color), constants_1.CM.hexa);
exports.isHexa = isHexa;
const isHsva = (color) => (0, exports.regTest)((0, exports.toLow)(color), constants_1.CM.hsva);
exports.isHsva = isHsva;
const isHsla = (color) => (0, exports.regTest)((0, exports.toLow)(color), constants_1.CM.hsla);
exports.isHsla = isHsla;
//# sourceMappingURL=utils.js.map