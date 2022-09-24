"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decomposeHsvaToRgba = exports.decomposeHsva = exports.decomposeHslaToRgba = exports.decomposeHsla = exports.decomposeHexa = exports.decomposeRgba = void 0;
const converts_1 = require("./converts");
const utils_1 = require("./utils");
// 分解rgba颜色值
const decomposeRgba = (color) => {
    const [r, g, b, a] = color
        .replace(/(^rgba?)|[()]/gi, '')
        .trim()
        .replace(/[,\s]+/g, ',')
        .split(',');
    return {
        r: (0, utils_1.prsFltInt)(r),
        g: (0, utils_1.prsFltInt)(g),
        b: (0, utils_1.prsFltInt)(b),
        a: (0, utils_1.prsAlpha)(a)
    };
};
exports.decomposeRgba = decomposeRgba;
// 分解十六进制颜色值
const decomposeHexa = (color) => {
    var _a;
    const c = (_a = (0, utils_1.formatHex)(color)) !== null && _a !== void 0 ? _a : '';
    return {
        r: (0, utils_1.hex2num)(c.slice(1, 3)),
        g: (0, utils_1.hex2num)(c.slice(3, 5)),
        b: (0, utils_1.hex2num)(c.slice(5, 7)),
        a: (0, utils_1.hexPct)(c.slice(7, 9))
    };
};
exports.decomposeHexa = decomposeHexa;
// 分解hsl颜色值
const decomposeHsla = (color) => {
    const [h, s, l, a] = color
        .replace(/(^hsla?)|[()]/gi, '')
        .trim()
        .replace(/[,\s]+/g, ',')
        .split(',');
    return {
        h: (0, utils_1.prsFltInt)(h, 360),
        s: (0, utils_1.prsFltInt)(s, 100),
        l: (0, utils_1.prsFltInt)(l, 100),
        a: (0, utils_1.prsAlpha)(a)
    };
};
exports.decomposeHsla = decomposeHsla;
// 分解hsl颜色值并转rgb
const decomposeHslaToRgba = (color) => {
    const { h, s, l, a } = (0, exports.decomposeHsla)(color);
    const { r, g, b } = (0, converts_1.hsl2rgb)({ h, s, l });
    return { r, g, b, a };
};
exports.decomposeHslaToRgba = decomposeHslaToRgba;
// 分解hsv颜色值
const decomposeHsva = (color) => {
    const [h, s, v, a] = color
        .replace(/(^hsva?)|[()]/gi, '')
        .trim()
        .replace(/[,\s]+/g, ',')
        .split(',');
    return {
        h: (0, utils_1.prsFltInt)(h, 360),
        s: (0, utils_1.prsFltInt)(s, 100),
        v: (0, utils_1.prsFltInt)(v, 100),
        a: (0, utils_1.prsAlpha)(a)
    };
};
exports.decomposeHsva = decomposeHsva;
// 分解hsv颜色值并转rgb
const decomposeHsvaToRgba = (color) => {
    const { h, s, v, a } = (0, exports.decomposeHsva)(color);
    const { r, g, b } = (0, converts_1.hsv2rgb)({ h, s, v });
    return { r, g, b, a };
};
exports.decomposeHsvaToRgba = decomposeHsvaToRgba;
//# sourceMappingURL=decomposes.js.map