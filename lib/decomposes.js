"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decomposeHsva = exports.decomposeHsla = exports.decomposeHexa = exports.decomposeRgba = void 0;
const converts_1 = require("./converts");
const utils_1 = require("./utils");
// 分解rgba颜色值
const decomposeRgba = (color) => {
    var _a;
    const c = (0, utils_1.deleteSpace)(color)
        .replace(/^rgba?/gi, '')
        .replace(/[()]/g, '')
        .split(',')
        .map(val => Number(val));
    return {
        r: (0, utils_1.fmtVal)(c[0]),
        g: (0, utils_1.fmtVal)(c[1]),
        b: (0, utils_1.fmtVal)(c[2]),
        a: (0, utils_1.hasAlpha)(color) ? (0, utils_1.fmtVal)((_a = c[3]) !== null && _a !== void 0 ? _a : 1, 1) : 1
    };
};
exports.decomposeRgba = decomposeRgba;
// 分解十六进制颜色值
const decomposeHexa = (color) => {
    var _a;
    const c = (_a = (0, utils_1.formatHex)((0, utils_1.deleteSpace)(color))) !== null && _a !== void 0 ? _a : '';
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
    var _a;
    const c = (0, utils_1.deleteSpace)(color)
        .replace(/(^hsla?)|[()%]/gi, '')
        .split(',')
        .map(val => Number(val));
    const a = (0, utils_1.hasAlpha)(color) ? (0, utils_1.fmtVal)((_a = c[3]) !== null && _a !== void 0 ? _a : 1, 1) : 1;
    const rgb = (0, converts_1.hsl2rgb)((0, utils_1.fmtVal)(c[0], 360), (0, utils_1.fmtVal)(c[1], 100), (0, utils_1.fmtVal)(c[2], 100));
    return Object.assign(Object.assign({}, rgb), { a });
};
exports.decomposeHsla = decomposeHsla;
// 分解hsv颜色值
const decomposeHsva = (color) => {
    var _a;
    const c = (0, utils_1.deleteSpace)(color)
        .replace(/(^hsva?)|[()%]/gi, '')
        .split(',')
        .map(val => Number(val));
    const a = (0, utils_1.hasAlpha)(color) ? (0, utils_1.fmtVal)((_a = c[3]) !== null && _a !== void 0 ? _a : 1, 1) : 1;
    const rgb = (0, converts_1.hsv2rgb)((0, utils_1.fmtVal)(c[0], 360), (0, utils_1.fmtVal)(c[1], 100), (0, utils_1.fmtVal)(c[2], 100));
    return Object.assign(Object.assign({}, rgb), { a });
};
exports.decomposeHsva = decomposeHsva;
//# sourceMappingURL=decomposes.js.map