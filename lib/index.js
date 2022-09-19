(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ColorTools = factory());
})(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _REG_EXP_MAP;

  var DEF_BG = '#ffffffff'; // color map

  var CM = {
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
  var REG_EXP_MAP = (_REG_EXP_MAP = {}, _defineProperty(_REG_EXP_MAP, CM.rgb_a, /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*(0?\.\d+|1)\s*)?\)$/gi), _defineProperty(_REG_EXP_MAP, CM.hex_a, /^#[0-9a-fA-F]{3,8}$/g), _defineProperty(_REG_EXP_MAP, CM.hsv_a, /^hsva?\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(,\s*(0?\.\d+|1)\s*)?\)$/gi), _defineProperty(_REG_EXP_MAP, CM.hsl_a, /^hsla?\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(,\s*(0?\.\d+|1)\s*)?\)$/gi), _defineProperty(_REG_EXP_MAP, CM.rgba, /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0?\.\d+|1)\s*\)$/gi), _defineProperty(_REG_EXP_MAP, CM.hexa, /^#[0-9a-fA-F]{8}$/g), _defineProperty(_REG_EXP_MAP, CM.hsva, /^hsva\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0?\.\d+|1)\s*\)$/gi), _defineProperty(_REG_EXP_MAP, CM.hsla, /^hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0?\.\d+|1)\s*\)$/gi), _defineProperty(_REG_EXP_MAP, CM.rgb, /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/gi), _defineProperty(_REG_EXP_MAP, CM.hex, /^#[0-9a-fA-F]{6}$/g), _defineProperty(_REG_EXP_MAP, CM.hsv, /^hsv\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/gi), _defineProperty(_REG_EXP_MAP, CM.hsl, /^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/gi), _REG_EXP_MAP);

  var rgb2hsv = function rgb2hsv(red, green, blue) {
    var min = Math.min(red, green, blue);
    var max = Math.max(red, green, blue);
    var dif = max - min;
    var sat = max === 0 ? 0 : dif / max * 100;
    var hue;

    if (max === min) {
      hue = 0;
    } else if (red === max) {
      hue = (green - blue) / dif;
    } else if (green === max) {
      hue = 2 + (blue - red) / dif;
    } else {
      hue = 4 + (red - green) / dif;
    }

    hue = Math.min(60 * hue, 360);

    if (hue < 0) {
      hue += 360;
    }

    return {
      h: fmtInt(hue, 360),
      s: fmtInt(sat, 100),
      v: fmtInt(max / 255 * 1e3 / 10, 100)
    };
  }; // hsv值转化为rgb值

  var hsv2rgb = function hsv2rgb(hue, sat, value) {
    hue = hue / 60;
    sat = sat / 100;
    value = value / 100;
    var mod = Math.floor(hue) % 6;
    var decimal = hue - Math.floor(hue);
    hue = 255 * value * (1 - sat);
    var vsd = (1 - sat * decimal) * value * 255;
    sat = 255 * value * (1 - sat * (1 - decimal));
    value *= 255;

    switch (mod) {
      case 0:
        return {
          r: fmtInt(value),
          g: fmtInt(sat),
          b: fmtInt(hue)
        };

      case 1:
        return {
          r: fmtInt(vsd),
          g: fmtInt(value),
          b: fmtInt(hue)
        };

      case 2:
        return {
          r: fmtInt(hue),
          g: fmtInt(value),
          b: fmtInt(sat)
        };

      case 3:
        return {
          r: fmtInt(hue),
          g: fmtInt(vsd),
          b: fmtInt(value)
        };

      case 4:
        return {
          r: fmtInt(sat),
          g: fmtInt(hue),
          b: fmtInt(value)
        };

      case 5:
      default:
        return {
          r: fmtInt(value),
          g: fmtInt(hue),
          b: fmtInt(vsd)
        };
    }
  }; // hsl值转化为rgb值

  var hsl2rgb = function hsl2rgb(hue, saturation, lightness) {
    var hue01 = fmtVal(hue, 360) / 360;
    var sat01 = fmtVal(saturation, 100) / 100;
    var light01 = fmtVal(lightness, 100) / 100;

    if (sat01 === 0) {
      return {
        r: 255 * light01,
        g: 255 * light01,
        b: 255 * light01
      };
    }

    sat01 = light01 < 0.5 ? light01 * (1 + sat01) : light01 + sat01 - light01 * sat01;
    light01 = 2 * light01 - sat01;
    var hsl = [0, 0, 0];

    for (var i = 0; i < hsl.length; i++) {
      var cv = hue01 + 1 / 3 * -(i - 1);
      cv = cv < 0 ? cv + 1 : cv > 1 ? cv - 1 : cv;

      if (cv * 6 < 1) {
        cv = light01 + 6 * (sat01 - light01) * cv;
      } else if (cv * 2 < 1) {
        cv = sat01;
      } else if (cv * 3 < 2) {
        cv = light01 + (sat01 - light01) * (2 / 3 - cv) * 6;
      } else {
        cv = light01;
      }

      hsl[i] = fmtInt(cv * 255);
    }

    return {
      r: hsl[0],
      g: hsl[1],
      b: hsl[2]
    };
  }; // rgb值转化为hsl值

  var rgb2hsl = function rgb2hsl(red, green, blue) {
    var red01 = fmtVal(red) / 255;
    var green01 = fmtVal(green) / 255;
    var blue01 = fmtVal(blue) / 255;
    var min = Math.min(red01, green01, blue01);
    var max = Math.max(red01, green01, blue01);
    var dif = max - min;
    var hue;

    if (max === min) {
      hue = 0;
    } else if (red01 === max) {
      hue = (green01 - blue01) / dif;
    } else if (green01 === max) {
      hue = 2 + (blue01 - red01) / dif;
    } else {
      hue = 4 + (red01 - green01) / dif;
    }

    hue = Math.min(60 * hue, 360);

    if (hue < 0) {
      hue += 360;
    }

    red01 = (min + max) / 2;
    var sat = (max === min ? 0 : red01 <= 0.5 ? dif / (max + min) : dif / (2 - max - min)) * 100;
    return {
      h: fmtInt(hue, 360),
      s: fmtInt(sat, 100),
      l: fmtInt(100 * red01, 100)
    };
  }; // cmy值转化为rgb值

  var rgba2rgb = function rgba2rgb(color) {
    var _rgba$a;

    var bgColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEF_BG;
    var rgba = getColorMap(color);
    var alpha = (_rgba$a = rgba.a) !== null && _rgba$a !== void 0 ? _rgba$a : 1;
    var bgMap = getColorMap(bgColor);
    var r = Math.round(rgba.r * alpha + bgMap.r * (1 - alpha));
    var g = Math.round(rgba.g * alpha + bgMap.g * (1 - alpha));
    var b = Math.round(rgba.b * alpha + bgMap.b * (1 - alpha));
    return {
      r: r,
      g: g,
      b: b,
      a: 1
    };
  }; // 把有透明度的颜色值转为rgb颜色

  var alpha2rgb = function alpha2rgb(color) {
    var _getColorMap = getColorMap(color),
        r = _getColorMap.r,
        g = _getColorMap.g,
        b = _getColorMap.b,
        a = _getColorMap.a;

    return rgba2rgb("rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a !== null && a !== void 0 ? a : 1, ")"), DEF_BG);
  };

  var decomposeRgba = function decomposeRgba(color) {
    var _c$;

    var c = deleteSpace(color).replace(/^rgba?/gi, '').replace(/[()]/g, '').split(',').map(function (val) {
      return Number(val);
    });
    return {
      r: fmtVal(c[0]),
      g: fmtVal(c[1]),
      b: fmtVal(c[2]),
      a: hasAlpha(color) ? fmtVal((_c$ = c[3]) !== null && _c$ !== void 0 ? _c$ : 1, 1) : 1
    };
  }; // 分解十六进制颜色值

  var decomposeHexa = function decomposeHexa(color) {
    var _formatHex;

    var c = (_formatHex = formatHex(deleteSpace(color))) !== null && _formatHex !== void 0 ? _formatHex : '';
    return {
      r: hex2num(c.slice(1, 3)),
      g: hex2num(c.slice(3, 5)),
      b: hex2num(c.slice(5, 7)),
      a: hexPct(c.slice(7, 9))
    };
  }; // 分解hsl颜色值

  var decomposeHsla = function decomposeHsla(color) {
    var _c$2;

    var c = deleteSpace(color).replace(/(^hsla?)|[()%]/gi, '').split(',').map(function (val) {
      return Number(val);
    });
    var a = hasAlpha(color) ? fmtVal((_c$2 = c[3]) !== null && _c$2 !== void 0 ? _c$2 : 1, 1) : 1;
    var rgb = hsl2rgb(fmtVal(c[0], 360), fmtVal(c[1], 100), fmtVal(c[2], 100));
    return _objectSpread2(_objectSpread2({}, rgb), {}, {
      a: a
    });
  }; // 分解hsv颜色值

  var decomposeHsva = function decomposeHsva(color) {
    var _c$3;

    var c = deleteSpace(color).replace(/(^hsva?)|[()%]/gi, '').split(',').map(function (val) {
      return Number(val);
    });
    var a = hasAlpha(color) ? fmtVal((_c$3 = c[3]) !== null && _c$3 !== void 0 ? _c$3 : 1, 1) : 1;
    var rgb = hsv2rgb(fmtVal(c[0], 360), fmtVal(c[1], 100), fmtVal(c[2], 100));
    return _objectSpread2(_objectSpread2({}, rgb), {}, {
      a: a
    });
  };

  var regTest = function regTest(value) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var regExp = REG_EXP_MAP[key];

    if (regExp) {
      regExp.lastIndex = 0;
      return regExp.test(value);
    }

    return false;
  }; // 获取默认值，高版es版本，可以用??代替

  var fmtVal = function fmtVal() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 255;
    return Math.max(0, Math.min(value, max));
  }; // 格式化值，保证值在0与max之间的整数

  var fmtInt = function fmtInt(value) {
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 255;
    return Math.round(fmtVal(value, max));
  }; // 十六进制转数字

  var hex2num = function hex2num(hex) {
    return hex == null ? 0 : parseInt("0x".concat(hex));
  }; // 数字转为十六进制

  var num2hex = function num2hex(num) {
    var val = Number(Math.min(num, 255)).toString(16);
    return val.length === 1 ? "0".concat(val) : val;
  }; // 十六进制值转为百分比

  var hexPct = function hexPct(hex) {
    return hex == null ? 1 : fmtInt(hex2num(hex) * 100 / 255) / 100;
  }; // 百分比转化为两位十六进制

  var pctHex = function pctHex(pct) {
    return num2hex(fmtInt(pct * 255));
  }; // 转化为小写

  var toLow = function toLow() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return color.toLowerCase();
  }; // 删除空格，并转化为小写同意处理

  var deleteSpace = function deleteSpace() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return toLow(color).replace(/\s+/g, '');
  }; // 格式化空格

  var fmtSpace = function fmtSpace() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return deleteSpace(color).replace(/,/g, ', ').replace(', .', ', 0.');
  }; // 获取颜色值的类型

  var colorType = function colorType(color) {
    if (color.length < 4) return '';
    var lower = toLow(color);

    if (regTest(lower, CM.rgb_a)) {
      return lower.startsWith(CM.rgba) ? CM.rgba : CM.rgb;
    } else if (regTest(color, CM.hex_a)) {
      return color.length === 4 || color.length === 7 ? CM.hex : CM.hexa;
    } else if (regTest(lower, CM.hsv_a)) {
      return lower.startsWith(CM.hsva) ? CM.hsva : CM.hsv;
    } else if (regTest(lower, CM.hsl_a)) {
      return lower.startsWith(CM.hsla) ? CM.hsla : CM.hsl;
    } else {
      return '';
    }
  }; // 判断颜色值是否含有透明度

  var hasAlpha = function hasAlpha(color) {
    return /a$/.test(colorType(color));
  }; // 重复一次十六进制字符

  var doubleHex = function doubleHex(hex) {
    return hex.replace(/[0-9a-fA-F]/g, function (m) {
      return m + m;
    });
  }; // 格式化十六进制颜色值，让其包含rgba

  var formatHex = function formatHex(color) {
    if (!color.startsWith('#') || color.length < 4) {
      console.error("".concat(color, " \u4E0D\u662F\u6B63\u786E\u7684\u5341\u516D\u8FDB\u5236\u989C\u8272\u503C\uFF01"));
      return undefined;
    }

    switch (color.length) {
      case 4:
        return "".concat(doubleHex(color), "ff");

      case 5:
        return "".concat(doubleHex(color));

      case 6:
        return "#".concat(doubleHex(color.slice(1, 4))).concat(color.slice(4));

      case 7:
        return "".concat(color, "ff");

      case 8:
        return "".concat(color.slice(0, 7)).concat(doubleHex(color.slice(7)));

      case 9:
        return color;

      default:
        return color.slice(0, 9);
    }
  }; // 获取颜色值rgba对象

  var getColorMap = function getColorMap(color) {
    switch (colorType(color)) {
      case CM.rgb:
      case CM.rgba:
        return decomposeRgba(color);

      case CM.hex:
      case CM.hexa:
        return decomposeHexa(color);

      case CM.hsl:
      case CM.hsla:
        return decomposeHsla(color);

      case CM.hsv:
      case CM.hsva:
        return decomposeHsva(color);

      default:
        // 默认rgb
        return decomposeRgba(color);
    }
  };
  var isRgb = function isRgb(color) {
    return regTest(toLow(color), CM.rgb);
  };
  var isHex = function isHex(color) {
    return regTest(toLow(color), CM.hex);
  };
  var isHsv = function isHsv(color) {
    return regTest(toLow(color), CM.hsv);
  };
  var isHsl = function isHsl(color) {
    return regTest(toLow(color), CM.hsl);
  };
  var isRgba = function isRgba(color) {
    return regTest(toLow(color), CM.rgba);
  };
  var isHexa = function isHexa(color) {
    return regTest(toLow(color), CM.hexa);
  };
  var isHsva = function isHsva(color) {
    return regTest(toLow(color), CM.hsva);
  };
  var isHsla = function isHsla(color) {
    return regTest(toLow(color), CM.hsla);
  };

  /**
   * 判断是否为颜色值
   * RGBA color to RGB
   * @param color RGBA颜色值
   * @param type 目标类型
   */

  var isColor = function isColor(color, type) {
    var colorType$1 = colorType(color);
    return !type ? !!colorType$1 : colorType$1 === type;
  };
  /**
   * RGBA转为RGB
   * RGBA color to RGB
   * @param color RGBA颜色值
   * @param bgColor 背景颜色值，默认白色
   */

  var rgbaToRgb = function rgbaToRgb(color) {
    var bgColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEF_BG;
    if (!isColor(color, CM.rgba)) return color;
    color = toLow(color); // 如果 背景颜色有透明度，先先将有透明度的值转为没有透明度的值

    var _rgba2rgb = rgba2rgb(color, hasAlpha(bgColor) ? rgbaToRgb(bgColor) : bgColor),
        r = _rgba2rgb.r,
        g = _rgba2rgb.g,
        b = _rgba2rgb.b;

    return "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
  };
  /**
   * 把颜色值转为RGB
   * The color to RGB
   * @param color 颜色值
   */

  var toRgb = function toRgb(color) {
    if (isRgb(color) || !isColor(color)) return fmtSpace(color);
    color = toLow(color);

    var _ref = hasAlpha(color) ? alpha2rgb(color) : getColorMap(color),
        r = _ref.r,
        g = _ref.g,
        b = _ref.b;

    return "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
  };
  /**
   * 把颜色值转为RGBA
   * The color to RGBA
   * @param color 颜色值
   * @param alpha 透明度
   */

  var toRgba = function toRgba(color, alpha) {
    var _ref2;

    if (isRgba(color) && alpha == null || !isColor(color)) return fmtSpace(color);
    color = toLow(color);

    var _utils$getColorMap = getColorMap(alpha == null ? color : toRgb(color)),
        r = _utils$getColorMap.r,
        g = _utils$getColorMap.g,
        b = _utils$getColorMap.b,
        a = _utils$getColorMap.a;

    return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat((_ref2 = alpha !== null && alpha !== void 0 ? alpha : a) !== null && _ref2 !== void 0 ? _ref2 : 1, ")");
  };
  /**
   * 把颜色值转为HEX
   * The color to HEX
   * @param color 颜色值
   */

  var toHex = function toHex(color) {
    if (isHex(color) || !isColor(color)) return fmtSpace(color);
    color = toLow(color);

    var _utils$getColorMap2 = getColorMap(toRgb(color)),
        r = _utils$getColorMap2.r,
        g = _utils$getColorMap2.g,
        b = _utils$getColorMap2.b;

    return "#".concat(num2hex(r)).concat(num2hex(g)).concat(num2hex(b));
  };
  /**
   * 把颜色值转为HEXA
   * The color to HEXA
   * @param color 颜色值
   * @param alpha 透明度
   */

  var toHexa = function toHexa(color, alpha) {
    var _ref3;

    if (isHexa(color) && alpha == null || !isColor(color)) return fmtSpace(color);
    color = toLow(color);

    var _utils$getColorMap3 = getColorMap(alpha == null ? color : toRgb(color)),
        r = _utils$getColorMap3.r,
        g = _utils$getColorMap3.g,
        b = _utils$getColorMap3.b,
        a = _utils$getColorMap3.a;

    return "#".concat(num2hex(r)).concat(num2hex(g)).concat(num2hex(b)).concat(pctHex((_ref3 = alpha !== null && alpha !== void 0 ? alpha : a) !== null && _ref3 !== void 0 ? _ref3 : 1));
  };
  /**
   * 把颜色值转为HSV
   * The color to HSV
   * @param color 颜色值
   */

  var toHsv = function toHsv(color) {
    if (isHsv(color) || !isColor(color)) return fmtSpace(color);
    color = toLow(color);

    var _utils$getColorMap4 = getColorMap(toRgb(color)),
        r = _utils$getColorMap4.r,
        g = _utils$getColorMap4.g,
        b = _utils$getColorMap4.b;

    var _rgb2hsv = rgb2hsv(r, g, b),
        h = _rgb2hsv.h,
        s = _rgb2hsv.s,
        v = _rgb2hsv.v;

    return "hsv(".concat(h, ", ").concat(Math.round(s), "%, ").concat(Math.round(v), "%)");
  };
  /**
   * 把颜色值转为HSVA
   * The color to HSVA
   * @param color 颜色值
   * @param alpha 透明度
   */

  var toHsva = function toHsva(color, alpha) {
    var _ref4;

    if (isHsva(color) && alpha == null || !isColor(color)) return fmtSpace(color);
    color = toLow(color);

    var _utils$getColorMap5 = getColorMap(alpha == null ? color : toRgb(color)),
        r = _utils$getColorMap5.r,
        g = _utils$getColorMap5.g,
        b = _utils$getColorMap5.b,
        a = _utils$getColorMap5.a;

    var _rgb2hsv2 = rgb2hsv(r, g, b),
        h = _rgb2hsv2.h,
        s = _rgb2hsv2.s,
        v = _rgb2hsv2.v;

    return "hsva(".concat(h, ", ").concat(Math.round(s), "%, ").concat(Math.round(v), "%, ").concat((_ref4 = alpha !== null && alpha !== void 0 ? alpha : a) !== null && _ref4 !== void 0 ? _ref4 : 1, ")");
  };
  /**
   * 把颜色值转为HSL
   * The color to HSL
   * @param color 颜色值
   */

  var toHsl = function toHsl(color) {
    if (isHsl(color) || !isColor(color)) return fmtSpace(color);
    color = toLow(color);

    var _utils$getColorMap6 = getColorMap(toRgb(color)),
        r = _utils$getColorMap6.r,
        g = _utils$getColorMap6.g,
        b = _utils$getColorMap6.b;

    var _rgb2hsl = rgb2hsl(r, g, b),
        h = _rgb2hsl.h,
        s = _rgb2hsl.s,
        l = _rgb2hsl.l;

    return "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)");
  };
  /**
   * 把颜色值转为HSLA
   * The color to HSLA
   * @param color 颜色值
   * @param alpha 透明度
   */

  var toHsla = function toHsla(color, alpha) {
    var _ref5;

    if (isHsla(color) && alpha == null || !isColor(color)) return fmtSpace(color);
    color = toLow(color);

    var _utils$getColorMap7 = getColorMap(alpha == null ? color : toRgb(color)),
        r = _utils$getColorMap7.r,
        g = _utils$getColorMap7.g,
        b = _utils$getColorMap7.b,
        a = _utils$getColorMap7.a;

    var _rgb2hsl2 = rgb2hsl(r, g, b),
        h = _rgb2hsl2.h,
        s = _rgb2hsl2.s,
        l = _rgb2hsl2.l;

    return "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat((_ref5 = alpha !== null && alpha !== void 0 ? alpha : a) !== null && _ref5 !== void 0 ? _ref5 : 1, ")");
  };
  /**
   * 获取颜色深度值，值越低深度越高
   * Get color depth value，The lower the value, the higher the depth
   * @param color 颜色值
   */

  var getColorDepth = function getColorDepth(color) {
    if (!isColor(color)) return undefined;
    color = toLow(color);

    var _utils$getColorMap8 = getColorMap(toRgb(color)),
        r = _utils$getColorMap8.r,
        g = _utils$getColorMap8.g,
        b = _utils$getColorMap8.b;

    return fmtInt(r * 0.299 + g * 0.587 + b * 0.114);
  };
  /**
   * 判断颜色是否是深色
   * Judge whether the color is dark or not
   * @param color 颜色值
   * @param criticalValue 临界值 默认127.5
   */

  var darkColor = function darkColor(color) {
    var criticalValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 127.5;
    var depth = getColorDepth(color);
    if (depth == null) return undefined;
    return depth < criticalValue;
  };
  /**
   * 判断颜色是否是浅色
   * Judge whether the color is light or not
   * @param color 颜色值
   * @param criticalValue 临界值 默认127.5
   */

  var lightColor = function lightColor(color, criticalValue) {
    if (!colorType(color)) return undefined;
    return !darkColor(color, criticalValue);
  };
  var tools = {
    toRgb: toRgb,
    toHex: toHex,
    toHsv: toHsv,
    toHsl: toHsl,
    toRgba: toRgba,
    toHexa: toHexa,
    toHsva: toHsva,
    toHsla: toHsla,
    isColor: isColor,
    rgbaToRgb: rgbaToRgb,
    darkColor: darkColor,
    lightColor: lightColor,
    getColorDepth: getColorDepth
  };

  var index = _objectSpread2(_objectSpread2({
    version: '1.0.1'
  }, tools), {}, {
    convert: function convert(color, target) {
      if (tools.isColor(color)) {
        var key = "to".concat(target[0].toUpperCase()).concat(target.slice(1).toLowerCase());
        var fn = tools[key];

        if (typeof fn === 'function') {
          return fn(color);
        }

        return color;
      }

      return color;
    }
  });

  return index;

}));
