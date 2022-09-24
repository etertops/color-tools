"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("./color");
const converts_1 = require("./converts");
const utils_1 = require("./utils");
exports.default = {
    toRgb: color_1.toRgb,
    toHex: color_1.toHex,
    toHsv: color_1.toHsv,
    toHsl: color_1.toHsl,
    toRgba: color_1.toRgba,
    toHexa: color_1.toHexa,
    toHsva: color_1.toHsva,
    toHsla: color_1.toHsla,
    isColor: utils_1.isColor,
    convert: converts_1.convert,
    rgbaToRgb: color_1.rgbaToRgb,
    darkColor: color_1.darkColor,
    lightColor: color_1.lightColor,
    getColorMap: utils_1.getColorMap,
    formatColor: utils_1.formatColor,
    getColorDepth: color_1.getColorDepth,
    version: '1.0.11'
};
//# sourceMappingURL=index.js.map