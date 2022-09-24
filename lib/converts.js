"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = exports.alpha2rgb = exports.rgba2rgb = exports.rgba2rgbByMap = exports.rgb2cmy = exports.cmy2rgb = exports.rgb2hsl = exports.hsl2rgb = exports.hsv2rgb = exports.rgb2hsv = exports.hsv2hsl = exports.hsl2hsv = void 0;
const constants_1 = require("./constants");
const utils_1 = require("./utils");
// 获取hue值
const getHue = (max, min, red, green, blue, dif) => {
    if (max === min) {
        return 0;
    }
    else if (red === max) {
        return (green - blue) / dif;
    }
    else if (green === max) {
        return 2 + (blue - red) / dif;
    }
    else {
        return 4 + (red - green) / dif;
    }
};
// hsl值转化为hsv值
const hsl2hsv = ({ h, s, l }) => {
    s = s / 100;
    l = l / 100;
    l *= 2;
    s *= l <= 1 ? l : 2 - l;
    return {
        h: (0, utils_1.fmtInt)(h, 360),
        s: (0, utils_1.fmtInt)(100 * ((2 * s) / (l + s) || 0), 100),
        v: (0, utils_1.fmtInt)(((l + s) / 2) * 100, 100)
    };
};
exports.hsl2hsv = hsl2hsv;
// hsv值转化为hsl值
const hsv2hsl = ({ h, s, v }) => {
    s = s / 100;
    v = v / 100;
    const dif = (2 - s) * v;
    const sv = s * v;
    if (dif === 0 || sv === 0) {
        s = 0;
    }
    else {
        s = sv / (dif <= 1 ? dif : 2 - dif);
    }
    return {
        h: (0, utils_1.fmtInt)(h, 360),
        s: (0, utils_1.fmtInt)(100 * s, 100),
        l: (0, utils_1.fmtInt)((dif / 2) * 100, 100)
    };
};
exports.hsv2hsl = hsv2hsl;
// rgb值转化为hsv值
const rgb2hsv = ({ r, g, b }) => {
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const dif = max - min;
    const sat = max === 0 ? 0 : (dif / max) * 100;
    let hue = getHue(max, min, r, g, b, dif);
    hue = Math.min(60 * hue, 360);
    if (hue < 0)
        hue += 360;
    return { h: (0, utils_1.fmtInt)(hue, 360), s: (0, utils_1.fmtInt)(sat, 100), v: (0, utils_1.fmtInt)(((max / 255) * 1e3) / 10, 100) };
};
exports.rgb2hsv = rgb2hsv;
// hsv值转化为rgb值
const hsv2rgb = ({ h, s, v }) => {
    h = h / 60;
    s = s / 100;
    v = v / 100;
    const mod = Math.floor(h) % 6;
    const decimal = h - Math.floor(h);
    h = 255 * v * (1 - s);
    const vsd = (1 - s * decimal) * v * 255;
    s = 255 * v * (1 - s * (1 - decimal));
    v *= 255;
    switch (mod) {
        case 0:
            return { r: (0, utils_1.fmtInt)(v), g: (0, utils_1.fmtInt)(s), b: (0, utils_1.fmtInt)(h) };
        case 1:
            return { r: (0, utils_1.fmtInt)(vsd), g: (0, utils_1.fmtInt)(v), b: (0, utils_1.fmtInt)(h) };
        case 2:
            return { r: (0, utils_1.fmtInt)(h), g: (0, utils_1.fmtInt)(v), b: (0, utils_1.fmtInt)(s) };
        case 3:
            return { r: (0, utils_1.fmtInt)(h), g: (0, utils_1.fmtInt)(vsd), b: (0, utils_1.fmtInt)(v) };
        case 4:
            return { r: (0, utils_1.fmtInt)(s), g: (0, utils_1.fmtInt)(h), b: (0, utils_1.fmtInt)(v) };
        case 5:
        default:
            return { r: (0, utils_1.fmtInt)(v), g: (0, utils_1.fmtInt)(h), b: (0, utils_1.fmtInt)(vsd) };
    }
};
exports.hsv2rgb = hsv2rgb;
// hsl值转化为rgb值
const hsl2rgb = ({ h, s, l }) => {
    h = (0, utils_1.fmtVal)(h, 360) / 360;
    s = (0, utils_1.fmtVal)(s, 100) / 100;
    l = (0, utils_1.fmtVal)(l, 100) / 100;
    if (s === 0) {
        return { r: 255 * l, g: 255 * l, b: 255 * l };
    }
    s = l < 0.5 ? l * (1 + s) : l + s - l * s;
    l = 2 * l - s;
    const hsl = [0, 0, 0];
    for (let i = 0; i < hsl.length; i++) {
        let cv = h + (1 / 3) * -(i - 1);
        cv = cv < 0 ? cv + 1 : cv > 1 ? cv - 1 : cv;
        if (cv * 6 < 1) {
            cv = l + 6 * (s - l) * cv;
        }
        else if (cv * 2 < 1) {
            cv = s;
        }
        else if (cv * 3 < 2) {
            cv = l + (s - l) * (2 / 3 - cv) * 6;
        }
        else {
            cv = l;
        }
        hsl[i] = (0, utils_1.fmtInt)(cv * 255);
    }
    return { r: hsl[0], g: hsl[1], b: hsl[2] };
};
exports.hsl2rgb = hsl2rgb;
// rgb值转化为hsl值
const rgb2hsl = ({ r, g, b }) => {
    r = (0, utils_1.fmtVal)(r) / 255;
    g = (0, utils_1.fmtVal)(g) / 255;
    b = (0, utils_1.fmtVal)(b) / 255;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const dif = max - min;
    let hue = getHue(max, min, r, g, b, dif);
    hue = Math.min(60 * hue, 360);
    if (hue < 0)
        hue += 360;
    r = (min + max) / 2;
    const sat = (max === min ? 0 : r <= 0.5 ? dif / (max + min) : dif / (2 - max - min)) * 100;
    return { h: (0, utils_1.fmtInt)(hue, 360), s: (0, utils_1.fmtInt)(sat, 100), l: (0, utils_1.fmtInt)(100 * r, 100) };
};
exports.rgb2hsl = rgb2hsl;
// cmy值转化为rgb值
const cmy2rgb = (cyan, magenta, yellow) => {
    return {
        c: Math.round(255 * (1 - (0, utils_1.fmtVal)(cyan / 100, 1))),
        m: Math.round(255 * (1 - (0, utils_1.fmtVal)(magenta / 100, 1))),
        y: Math.round(255 * (1 - (0, utils_1.fmtVal)(yellow / 100, 1)))
    };
};
exports.cmy2rgb = cmy2rgb;
// rgb值转化为cmy值
const rgb2cmy = ({ r, g, b }) => {
    return {
        r: Math.round(100 * (0, utils_1.fmtVal)(1 - r / 255, 1)) || 0,
        g: Math.round(100 * (0, utils_1.fmtVal)(1 - g / 255, 1)) || 0,
        b: Math.round(100 * (0, utils_1.fmtVal)(1 - b / 255, 1)) || 0
    };
};
exports.rgb2cmy = rgb2cmy;
// 把rgba的颜色值，转化为rgb颜色值
const rgba2rgbByMap = (rgba, bgMap = constants_1.DEF_BG_MAP) => {
    var _a;
    const alpha = (_a = rgba.a) !== null && _a !== void 0 ? _a : 1;
    const r = Math.round(rgba.r * alpha + bgMap.r * (1 - alpha));
    const g = Math.round(rgba.g * alpha + bgMap.g * (1 - alpha));
    const b = Math.round(rgba.b * alpha + bgMap.b * (1 - alpha));
    return { r, g, b, a: undefined };
};
exports.rgba2rgbByMap = rgba2rgbByMap;
// 把rgba的颜色值，转化为rgb颜色值
const rgba2rgb = (color, bgColor = constants_1.DEF_BG) => {
    const rgba = (0, utils_1.getRgbaMap)(color);
    const bgMap = (0, utils_1.getRgbaMap)(bgColor);
    return (0, exports.rgba2rgbByMap)(rgba, bgMap);
};
exports.rgba2rgb = rgba2rgb;
// 把有透明度的颜色值转为rgb颜色
const alpha2rgb = (color) => {
    const { r, g, b, a } = (0, utils_1.getRgbaMap)(color);
    return (0, exports.rgba2rgb)(`rgba(${r}, ${g}, ${b}, ${a !== null && a !== void 0 ? a : 1})`, constants_1.DEF_BG);
};
exports.alpha2rgb = alpha2rgb;
const convertTo = (color, method) => {
    switch (method) {
        case 'hsv2hsv':
        case 'hsl2hsl':
        case 'rgb2rgb':
            return color;
        case 'rgb2hsl':
            return (0, exports.rgb2hsl)(color);
        case 'rgb2hsv':
            return (0, exports.rgb2hsv)(color);
        case 'hsl2rgb':
            return (0, exports.hsl2rgb)(color);
        case 'hsl2hsv':
            return (0, exports.hsl2hsv)(color);
        case 'hsv2rgb':
            return (0, exports.hsv2rgb)(color);
        case 'hsv2hsl':
            return (0, exports.hsv2hsl)(color);
        default:
            return color;
    }
};
// 颜色值转换
const convert = (color, target) => {
    var _a;
    target = constants_1.CM[target !== null && target !== void 0 ? target : constants_1.CM.rgb] || constants_1.CM.rgb;
    if (typeof color === 'string') {
        const type = constants_1.CM[(_a = (0, utils_1.getColorType)(color)) !== null && _a !== void 0 ? _a : ''];
        if (type) {
            return convertTo((0, utils_1.getColorMap)(color), `${type}2${target}`);
        }
    }
    else if (typeof color === 'object') {
        if ((0, utils_1.contains)(color, ['r', 'g', 'b'])) {
            return convertTo(color, `rgb2${target}`);
        }
        else if ((0, utils_1.contains)(color, ['h', 's', 'l'])) {
            return convertTo(color, `hsl2${target}`);
        }
        else if ((0, utils_1.contains)(color, ['h', 's', 'v'])) {
            return convertTo(color, `hsv2${target}`);
        }
    }
    return color;
};
exports.convert = convert;
//# sourceMappingURL=converts.js.map