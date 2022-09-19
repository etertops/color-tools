"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REG_EXP_MAP = exports.CM = exports.DEF_BG = void 0;
exports.DEF_BG = '#ffffffff';
// color map
exports.CM = {
    rgb: 'rgb',
    hex: 'hex',
    hsv: 'hsv',
    hsl: 'hsl',
    rgba: 'rgba',
    hexa: 'hexa',
    hsva: 'hsva',
    hsla: 'hsla',
    rgb_a: 'rgb_a',
    hex_a: 'hex_a',
    hsv_a: 'hsv_a',
    hsl_a: 'hsl_a'
};
exports.REG_EXP_MAP = {
    [exports.CM.rgb_a]: /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*(0?\.\d+|1)\s*)?\)$/gi,
    [exports.CM.hex_a]: /^#[0-9a-fA-F]{3,8}$/g,
    [exports.CM.hsv_a]: /^hsva?\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(,\s*(0?\.\d+|1)\s*)?\)$/gi,
    [exports.CM.hsl_a]: /^hsla?\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(,\s*(0?\.\d+|1)\s*)?\)$/gi,
    [exports.CM.rgba]: /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0?\.\d+|1)\s*\)$/gi,
    [exports.CM.hexa]: /^#[0-9a-fA-F]{8}$/g,
    [exports.CM.hsva]: /^hsva\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0?\.\d+|1)\s*\)$/gi,
    [exports.CM.hsla]: /^hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0?\.\d+|1)\s*\)$/gi,
    [exports.CM.rgb]: /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/gi,
    [exports.CM.hex]: /^#[0-9a-fA-F]{6}$/g,
    [exports.CM.hsv]: /^hsv\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/gi,
    [exports.CM.hsl]: /^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/gi
};
//# sourceMappingURL=constants.js.map