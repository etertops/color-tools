"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REG_EXP_MAP = exports.CM = exports.DEF_CRITICAL_VALUE = exports.DEF_BG_MAP = exports.DEF_BG = void 0;
exports.DEF_BG = '#ffffffff';
exports.DEF_BG_MAP = { r: 255, g: 255, b: 255 };
exports.DEF_CRITICAL_VALUE = 127.5;
// color map
exports.CM = {
    rgb: 'rgb',
    hex: 'hex',
    hsv: 'hsv',
    hsl: 'hsl'
};
exports.REG_EXP_MAP = {
    rgb_a: /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*(0?\.\d+|1%?)\s*)?\)$/gi,
    hex_a: /^#[0-9a-fA-F]{3,8}$/g,
    hsv_a: /^hsva?\(\s*\d{1,3}(deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(,\s*(0?\.\d+|1%?)\s*)?\)$/gi,
    hsl_a: /^hsla?\(\s*\d{1,3}(deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(,\s*(0?\.\d+|1%?)\s*)?\)$/gi,
    rgba: /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0?\.\d+|1%?)\s*\)$/gi,
    hexa: /^#[0-9a-fA-F]{8}$/g,
    hsva: /^hsva\(\s*\d{1,3}(deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0?\.\d+|1%?)\s*\)$/gi,
    hsla: /^hsla\(\s*\d{1,3}(deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0?\.\d+|1%?)\s*\)$/gi,
    rgb: /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/gi,
    hex: /^#[0-9a-fA-F]{6}$/g,
    hsv: /^hsv\(\s*\d{1,3}(deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/gi,
    hsl: /^hsl\(\s*\d{1,3}(deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/gi
};
//# sourceMappingURL=constants.js.map