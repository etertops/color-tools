"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alpha2rgb = exports.rgba2rgb = exports.rgb2cmy = exports.cmy2rgb = exports.rgb2hsl = exports.hsl2rgb = exports.hsv2rgb = exports.rgb2hsv = exports.hsv2hsl = exports.hsl2hsv = void 0;
const constants_1 = require("./constants");
const utils_1 = require("./utils");
// hsl值转化为hsv值
const hsl2hsv = (hue, sat, light) => {
    sat = sat / 100;
    light = light / 100;
    const lightMin = Math.max(light, 0.01);
    let satMin = sat;
    light *= 2;
    sat *= light <= 1 ? light : 2 - light;
    satMin *= lightMin <= 1 ? lightMin : 2 - lightMin;
    const value = (light + sat) / 2;
    const vSat = light === 0 ? (2 * satMin) / (lightMin + satMin) : (2 * sat) / (light + sat);
    return {
        h: hue,
        s: vSat * 100,
        v: value * 100
    };
};
exports.hsl2hsv = hsl2hsv;
// hsv值转化为hsl值
const hsv2hsl = (hue, sat, value) => {
    sat = sat / 100;
    value = value / 100;
    const dif = (2 - sat) * value;
    const sv = sat * value;
    if (dif === 0 || sv === 0) {
        sat = 0;
    }
    else {
        sat = sv / (dif <= 1 ? dif : 2 - dif);
    }
    return {
        h: (0, utils_1.fmtInt)(hue, 360),
        s: (0, utils_1.fmtInt)(100 * sat, 100),
        l: (0, utils_1.fmtInt)((dif / 2) * 100, 100)
    };
};
exports.hsv2hsl = hsv2hsl;
// rgb值转化为hsv值
const rgb2hsv = (red, green, blue) => {
    const min = Math.min(red, green, blue);
    const max = Math.max(red, green, blue);
    const dif = max - min;
    const sat = max === 0 ? 0 : (dif / max) * 100;
    let hue;
    if (max === min) {
        hue = 0;
    }
    else if (red === max) {
        hue = (green - blue) / dif;
    }
    else if (green === max) {
        hue = 2 + (blue - red) / dif;
    }
    else {
        hue = 4 + (red - green) / dif;
    }
    hue = Math.min(60 * hue, 360);
    if (hue < 0) {
        hue += 360;
    }
    return { h: (0, utils_1.fmtInt)(hue, 360), s: (0, utils_1.fmtInt)(sat, 100), v: (0, utils_1.fmtInt)(((max / 255) * 1e3) / 10, 100) };
};
exports.rgb2hsv = rgb2hsv;
// hsv值转化为rgb值
const hsv2rgb = (hue, sat, value) => {
    hue = hue / 60;
    sat = sat / 100;
    value = value / 100;
    const mod = Math.floor(hue) % 6;
    const decimal = hue - Math.floor(hue);
    hue = 255 * value * (1 - sat);
    const vsd = (1 - sat * decimal) * value * 255;
    sat = 255 * value * (1 - sat * (1 - decimal));
    value *= 255;
    switch (mod) {
        case 0:
            return { r: (0, utils_1.fmtInt)(value), g: (0, utils_1.fmtInt)(sat), b: (0, utils_1.fmtInt)(hue) };
        case 1:
            return { r: (0, utils_1.fmtInt)(vsd), g: (0, utils_1.fmtInt)(value), b: (0, utils_1.fmtInt)(hue) };
        case 2:
            return { r: (0, utils_1.fmtInt)(hue), g: (0, utils_1.fmtInt)(value), b: (0, utils_1.fmtInt)(sat) };
        case 3:
            return { r: (0, utils_1.fmtInt)(hue), g: (0, utils_1.fmtInt)(vsd), b: (0, utils_1.fmtInt)(value) };
        case 4:
            return { r: (0, utils_1.fmtInt)(sat), g: (0, utils_1.fmtInt)(hue), b: (0, utils_1.fmtInt)(value) };
        case 5:
        default:
            return { r: (0, utils_1.fmtInt)(value), g: (0, utils_1.fmtInt)(hue), b: (0, utils_1.fmtInt)(vsd) };
    }
};
exports.hsv2rgb = hsv2rgb;
// hsl值转化为rgb值
const hsl2rgb = (hue, saturation, lightness) => {
    const hue01 = (0, utils_1.fmtVal)(hue, 360) / 360;
    let sat01 = (0, utils_1.fmtVal)(saturation, 100) / 100;
    let light01 = (0, utils_1.fmtVal)(lightness, 100) / 100;
    if (sat01 === 0) {
        return { r: 255 * light01, g: 255 * light01, b: 255 * light01 };
    }
    sat01 = light01 < 0.5 ? light01 * (1 + sat01) : light01 + sat01 - light01 * sat01;
    light01 = 2 * light01 - sat01;
    const hsl = [0, 0, 0];
    for (let i = 0; i < hsl.length; i++) {
        let cv = hue01 + (1 / 3) * -(i - 1);
        cv = cv < 0 ? cv + 1 : cv > 1 ? cv - 1 : cv;
        if (cv * 6 < 1) {
            cv = light01 + 6 * (sat01 - light01) * cv;
        }
        else if (cv * 2 < 1) {
            cv = sat01;
        }
        else if (cv * 3 < 2) {
            cv = light01 + (sat01 - light01) * (2 / 3 - cv) * 6;
        }
        else {
            cv = light01;
        }
        hsl[i] = (0, utils_1.fmtInt)(cv * 255);
    }
    return { r: hsl[0], g: hsl[1], b: hsl[2] };
};
exports.hsl2rgb = hsl2rgb;
// rgb值转化为hsl值
const rgb2hsl = (red, green, blue) => {
    let red01 = (0, utils_1.fmtVal)(red) / 255;
    const green01 = (0, utils_1.fmtVal)(green) / 255;
    const blue01 = (0, utils_1.fmtVal)(blue) / 255;
    const min = Math.min(red01, green01, blue01);
    const max = Math.max(red01, green01, blue01);
    const dif = max - min;
    let hue;
    if (max === min) {
        hue = 0;
    }
    else if (red01 === max) {
        hue = (green01 - blue01) / dif;
    }
    else if (green01 === max) {
        hue = 2 + (blue01 - red01) / dif;
    }
    else {
        hue = 4 + (red01 - green01) / dif;
    }
    hue = Math.min(60 * hue, 360);
    if (hue < 0) {
        hue += 360;
    }
    red01 = (min + max) / 2;
    const sat = (max === min ? 0 : red01 <= 0.5 ? dif / (max + min) : dif / (2 - max - min)) * 100;
    return { h: (0, utils_1.fmtInt)(hue, 360), s: (0, utils_1.fmtInt)(sat, 100), l: (0, utils_1.fmtInt)(100 * red01, 100) };
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
const rgb2cmy = (r, g, b) => {
    return {
        r: Math.round(100 * (0, utils_1.fmtVal)(1 - r / 255, 1)) || 0,
        g: Math.round(100 * (0, utils_1.fmtVal)(1 - g / 255, 1)) || 0,
        b: Math.round(100 * (0, utils_1.fmtVal)(1 - b / 255, 1)) || 0
    };
};
exports.rgb2cmy = rgb2cmy;
// 把rgba的颜色值，转化为rgb颜色值
const rgba2rgb = (color, bgColor = constants_1.DEF_BG) => {
    var _a;
    const rgba = (0, utils_1.getColorMap)(color);
    const alpha = (_a = rgba.a) !== null && _a !== void 0 ? _a : 1;
    const bgMap = (0, utils_1.getColorMap)(bgColor);
    const r = Math.round(rgba.r * alpha + bgMap.r * (1 - alpha));
    const g = Math.round(rgba.g * alpha + bgMap.g * (1 - alpha));
    const b = Math.round(rgba.b * alpha + bgMap.b * (1 - alpha));
    return { r, g, b, a: 1 };
};
exports.rgba2rgb = rgba2rgb;
// 把有透明度的颜色值转为rgb颜色
const alpha2rgb = (color) => {
    const { r, g, b, a } = (0, utils_1.getColorMap)(color);
    return (0, exports.rgba2rgb)(`rgba(${r}, ${g}, ${b}, ${a !== null && a !== void 0 ? a : 1})`, constants_1.DEF_BG);
};
exports.alpha2rgb = alpha2rgb;
//# sourceMappingURL=converts.js.map