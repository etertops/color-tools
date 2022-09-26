(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ColorTools = {}));
})(this, (function (exports) { 'use strict';

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

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var DEF_BG = '#ffffffff';
  var DEF_BG_MAP = {
    r: 255,
    g: 255,
    b: 255
  };
  var DEF_CRITICAL_VALUE = 127.5; // color map

  var CM = {
    rgb: 'rgb',
    hex: 'hex',
    hsv: 'hsv',
    hsl: 'hsl'
  };

  var decomposeRgba = function decomposeRgba(color) {
    var _color$replace$trim$r = color.replace(/(^rgba?)|[()]/gi, '').trim().replace(/[,\s]+/g, ',').split(','),
        _color$replace$trim$r2 = _slicedToArray(_color$replace$trim$r, 4),
        r = _color$replace$trim$r2[0],
        g = _color$replace$trim$r2[1],
        b = _color$replace$trim$r2[2],
        a = _color$replace$trim$r2[3];

    return {
      r: prsFltInt(r),
      g: prsFltInt(g),
      b: prsFltInt(b),
      a: prsAlpha(a)
    };
  }; // 分解十六进制颜色值

  var decomposeHexa = function decomposeHexa(color) {
    var _formatHex;

    var c = (_formatHex = formatHex(color)) !== null && _formatHex !== void 0 ? _formatHex : '';
    return {
      r: hex2num(c.slice(1, 3)),
      g: hex2num(c.slice(3, 5)),
      b: hex2num(c.slice(5, 7)),
      a: hexPct(c.slice(7, 9))
    };
  }; // 分解hsl颜色值

  var decomposeHsla = function decomposeHsla(color) {
    var _color$replace$trim$r3 = color.replace(/(^hsla?)|[()]/gi, '').trim().replace(/[,\s]+/g, ',').split(','),
        _color$replace$trim$r4 = _slicedToArray(_color$replace$trim$r3, 4),
        h = _color$replace$trim$r4[0],
        s = _color$replace$trim$r4[1],
        l = _color$replace$trim$r4[2],
        a = _color$replace$trim$r4[3];

    return {
      h: prsFltInt(h, 360),
      s: prsFltInt(s, 100),
      l: prsFltInt(l, 100),
      a: prsAlpha(a)
    };
  }; // 分解hsl颜色值并转rgb

  var decomposeHslaToRgba = function decomposeHslaToRgba(color) {
    var _decomposeHsla = decomposeHsla(color),
        h = _decomposeHsla.h,
        s = _decomposeHsla.s,
        l = _decomposeHsla.l,
        a = _decomposeHsla.a;

    var _hsl2rgb = hsl2rgb({
      h: h,
      s: s,
      l: l
    }),
        r = _hsl2rgb.r,
        g = _hsl2rgb.g,
        b = _hsl2rgb.b;

    return {
      r: r,
      g: g,
      b: b,
      a: a
    };
  }; // 分解hsv颜色值

  var decomposeHsva = function decomposeHsva(color) {
    var _color$replace$trim$r5 = color.replace(/(^hsva?)|[()]/gi, '').trim().replace(/[,\s]+/g, ',').split(','),
        _color$replace$trim$r6 = _slicedToArray(_color$replace$trim$r5, 4),
        h = _color$replace$trim$r6[0],
        s = _color$replace$trim$r6[1],
        v = _color$replace$trim$r6[2],
        a = _color$replace$trim$r6[3];

    return {
      h: prsFltInt(h, 360),
      s: prsFltInt(s, 100),
      v: prsFltInt(v, 100),
      a: prsAlpha(a)
    };
  }; // 分解hsv颜色值并转rgb

  var decomposeHsvaToRgba = function decomposeHsvaToRgba(color) {
    var _decomposeHsva = decomposeHsva(color),
        h = _decomposeHsva.h,
        s = _decomposeHsva.s,
        v = _decomposeHsva.v,
        a = _decomposeHsva.a;

    var _hsv2rgb = hsv2rgb({
      h: h,
      s: s,
      v: v
    }),
        r = _hsv2rgb.r,
        g = _hsv2rgb.g,
        b = _hsv2rgb.b;

    return {
      r: r,
      g: g,
      b: b,
      a: a
    };
  };

  var pctToNum = function pctToNum(pct) {
    return pct.endsWith('%') ? parseFloat(pct) / 100 : parseFloat(pct);
  }; // 获取颜色值的类型


  var colorType = function colorType(color) {
    if (color.length < 4) return '';

    if (color.startsWith('#')) {
      return CM.hex;
    } else {
      var type = color.toLowerCase().slice(0, 3) || '';
      return CM[type] || '';
    }
  }; // 获取颜色值的类型


  var getColorType = function getColorType(color) {
    return colorType(color);
  }; // 判断颜色值是否含有透明度

  var validAlpha = function validAlpha(alpha) {
    return !!alpha && alpha < 1 && alpha > 0;
  }; // 重复一次十六进制字符


  var doubleHex = function doubleHex(hex) {
    return hex.replace(/[0-9a-fA-F]/g, function (m) {
      return m + m;
    });
  };

  var hexEnd = function hexEnd(color) {
    return color.endsWith('ff') ? color.slice(0, 7) : color;
  }; // 格式化十六进制颜色值，让其包含rgba


  var error = function error(color, value) {
    console.error("\u3010".concat(color, "\u3011\u4E0D\u662F\u6709\u6548\u7684\u989C\u8272\u503C!  The color value ").concat(color, " is invalid!"));
    return value !== null && value !== void 0 ? value : color;
  }; // 格式化值，保证值在0与max之间


  var fmtVal = function fmtVal() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 255;
    return Math.max(0, Math.min(value, max));
  }; // 格式化值，保证值在0与max之间的整数

  var fmtInt = function fmtInt(value) {
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 255;
    return Math.round(fmtVal(value, max));
  }; // 字符串转float 后转int

  var prsFltInt = function prsFltInt(value, max) {
    var def = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    return fmtInt(value ? parseFloat(value) : def, max);
  }; // 转换alpha通道

  var prsAlpha = function prsAlpha(alpha, def) {
    return alpha ? fmtVal(pctToNum(alpha), 1) : def;
  }; // 十六进制转数字

  var hex2num = function hex2num(hex) {
    return hex == null ? 0 : parseInt("0x".concat(hex));
  }; // 数字转为十六进制

  var num2hex = function num2hex(num) {
    var val = Number(Math.min(num, 255)).toString(16);
    return val.length === 1 ? "0".concat(val) : val;
  }; // 十六进制值转为百分比

  var hexPct = function hexPct(hex) {
    return !hex ? 1 : fmtInt(hex2num(hex) * 100 / 255) / 100;
  }; // 百分比转化为两位十六进制

  var pctHex = function pctHex(pct) {
    return num2hex(fmtInt(pct * 255));
  }; // 判断是否为颜色值

  var isColor = function isColor(color, type) {
    var cType = colorType(color);
    return !type ? !!cType : cType === type;
  };
  var formatHex = function formatHex(color) {
    color = color.replace(/[^0-9a-fA-F]/g, '') || '';
    color = "#".concat(color.toLowerCase());

    switch (color.length) {
      case 1:
        return "".concat(doubleHex('#000'));

      case 2:
        return "".concat(doubleHex(color + '00'));

      case 3:
        return "".concat(doubleHex(color + '0'));

      case 4:
        return "".concat(doubleHex(color));

      case 5:
        return hexEnd("".concat(doubleHex(color)));

      case 6:
        return hexEnd("#".concat(doubleHex(color.slice(1, 4))).concat(color.slice(4)));

      case 7:
        return color;

      case 8:
        return hexEnd("".concat(color.slice(0, 7)).concat(doubleHex(color.slice(7))));

      case 9:
        return hexEnd(color);

      default:
        return hexEnd(color.slice(0, 9));
    }
  };
  var formatRgba = function formatRgba(color) {
    var _decomposeRgba = decomposeRgba(color),
        r = _decomposeRgba.r,
        g = _decomposeRgba.g,
        b = _decomposeRgba.b,
        a = _decomposeRgba.a;

    var va = validAlpha(a);
    var alpha = va ? ", ".concat(a) : '';
    return "rgb".concat(va ? 'a' : '', "(").concat(r, ", ").concat(g, ", ").concat(b).concat(alpha, ")");
  };
  var formatHsla = function formatHsla(color) {
    var _decomposeHsla = decomposeHsla(color),
        h = _decomposeHsla.h,
        s = _decomposeHsla.s,
        l = _decomposeHsla.l,
        a = _decomposeHsla.a;

    var va = validAlpha(a);
    var alpha = va ? ", ".concat(a) : '';
    return "hsl".concat(va ? 'a' : '', "(").concat(h, ", ").concat(s, "%, ").concat(l, "%").concat(alpha, ")");
  };
  var formatHsva = function formatHsva(color) {
    var _decomposeHsva = decomposeHsva(color),
        h = _decomposeHsva.h,
        s = _decomposeHsva.s,
        v = _decomposeHsva.v,
        a = _decomposeHsva.a;

    var va = validAlpha(a);
    var alpha = va ? ", ".concat(a) : '';
    return "hsv".concat(va ? 'a' : '', "(").concat(h, ", ").concat(s, "%, ").concat(v, "%").concat(alpha, ")");
  };
  var formatColor = function formatColor(color) {
    color = color.trim().toLowerCase();
    var match = color.match(/(^#)|(^rgba?)|(^hsla?)|(^hsva?)/gi);

    switch (match ? match[0] : '') {
      case '#':
        return formatHex(color);

      case 'rgb':
      case 'rgba':
        return formatRgba(color);

      case 'hsl':
      case 'hsla':
        return formatHsla(color);

      case 'hsv':
      case 'hsva':
        return formatHsva(color);

      default:
        return color;
    }
  }; // 获取颜色值rgba对象

  var getColorMap = function getColorMap(color) {
    switch (colorType(color)) {
      case CM.rgb:
        return decomposeRgba(color);

      case CM.hex:
        return decomposeHexa(color);

      case CM.hsl:
        return decomposeHsla(color);

      case CM.hsv:
        return decomposeHsva(color);

      default:
        // 默认rgb
        return decomposeRgba(color);
    }
  }; // 获取颜色值rgba对象

  var getRgbaMap = function getRgbaMap(color) {
    switch (colorType(color)) {
      case CM.rgb:
        return decomposeRgba(color);

      case CM.hex:
        return decomposeHexa(color);

      case CM.hsl:
        return decomposeHslaToRgba(color);

      case CM.hsv:
        return decomposeHsvaToRgba(color);

      default:
        // 默认rgb
        return decomposeRgba(color);
    }
  };
  var callback = function callback(color, fn, alpha, errorValue) {
    if (isColor(color)) {
      var rgba = getRgbaMap(color);
      return fn(alpha != null && validAlpha(rgba.a) ? rgba2rgbByMap(rgba) : rgba);
    }

    return error(color, errorValue);
  };
  var callback2 = function callback2(color, fn, bgColor, errorValue) {
    if (isColor(color)) {
      bgColor = bgColor ? isColor(bgColor) ? bgColor : DEF_BG : DEF_BG;
      var bgRgba = getRgbaMap(bgColor);
      return fn(rgba2rgbByMap(getRgbaMap(color), validAlpha(bgRgba.a) ? rgba2rgbByMap(bgRgba) : bgRgba));
    }

    return error(color, errorValue);
  };
  var contains = function contains(object, keys) {
    var flag = true;
    keys.forEach(function (key) {
      flag = flag && object[key] != null;
    });
    return flag;
  };

  var getHue = function getHue(max, min, red, green, blue, dif) {
    if (max === min) {
      return 0;
    } else if (red === max) {
      return (green - blue) / dif;
    } else if (green === max) {
      return 2 + (blue - red) / dif;
    } else {
      return 4 + (red - green) / dif;
    }
  }; // hsl值转化为hsv值


  var hsl2hsv = function hsl2hsv(_ref) {
    var h = _ref.h,
        s = _ref.s,
        l = _ref.l;
    s = s / 100;
    l = l / 100;
    l *= 2;
    s *= l <= 1 ? l : 2 - l;
    return {
      h: fmtInt(h, 360),
      s: fmtInt(100 * (2 * s / (l + s) || 0), 100),
      v: fmtInt((l + s) / 2 * 100, 100)
    };
  }; // hsv值转化为hsl值

  var hsv2hsl = function hsv2hsl(_ref2) {
    var h = _ref2.h,
        s = _ref2.s,
        v = _ref2.v;
    s = s / 100;
    v = v / 100;
    var dif = (2 - s) * v;
    var sv = s * v;

    if (dif === 0 || sv === 0) {
      s = 0;
    } else {
      s = sv / (dif <= 1 ? dif : 2 - dif);
    }

    return {
      h: fmtInt(h, 360),
      s: fmtInt(100 * s, 100),
      l: fmtInt(dif / 2 * 100, 100)
    };
  }; // rgb值转化为hsv值

  var rgb2hsv = function rgb2hsv(_ref3) {
    var r = _ref3.r,
        g = _ref3.g,
        b = _ref3.b;
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var dif = max - min;
    var sat = max === 0 ? 0 : dif / max * 100;
    var hue = getHue(max, min, r, g, b, dif);
    hue = Math.min(60 * hue, 360);
    if (hue < 0) hue += 360;
    return {
      h: fmtInt(hue, 360),
      s: fmtInt(sat, 100),
      v: fmtInt(max / 255 * 1e3 / 10, 100)
    };
  }; // hsv值转化为rgb值

  var hsv2rgb = function hsv2rgb(_ref4) {
    var h = _ref4.h,
        s = _ref4.s,
        v = _ref4.v;
    h = h / 60;
    s = s / 100;
    v = v / 100;
    var mod = Math.floor(h) % 6;
    var decimal = h - Math.floor(h);
    h = 255 * v * (1 - s);
    var vsd = (1 - s * decimal) * v * 255;
    s = 255 * v * (1 - s * (1 - decimal));
    v *= 255;

    switch (mod) {
      case 0:
        return {
          r: fmtInt(v),
          g: fmtInt(s),
          b: fmtInt(h)
        };

      case 1:
        return {
          r: fmtInt(vsd),
          g: fmtInt(v),
          b: fmtInt(h)
        };

      case 2:
        return {
          r: fmtInt(h),
          g: fmtInt(v),
          b: fmtInt(s)
        };

      case 3:
        return {
          r: fmtInt(h),
          g: fmtInt(vsd),
          b: fmtInt(v)
        };

      case 4:
        return {
          r: fmtInt(s),
          g: fmtInt(h),
          b: fmtInt(v)
        };

      case 5:
      default:
        return {
          r: fmtInt(v),
          g: fmtInt(h),
          b: fmtInt(vsd)
        };
    }
  }; // hsl值转化为rgb值

  var hsl2rgb = function hsl2rgb(_ref5) {
    var h = _ref5.h,
        s = _ref5.s,
        l = _ref5.l;
    h = fmtVal(h, 360) / 360;
    s = fmtVal(s, 100) / 100;
    l = fmtVal(l, 100) / 100;

    if (s === 0) {
      return {
        r: 255 * l,
        g: 255 * l,
        b: 255 * l
      };
    }

    s = l < 0.5 ? l * (1 + s) : l + s - l * s;
    l = 2 * l - s;
    var hsl = [0, 0, 0];

    for (var i = 0; i < hsl.length; i++) {
      var cv = h + 1 / 3 * -(i - 1);
      cv = cv < 0 ? cv + 1 : cv > 1 ? cv - 1 : cv;

      if (cv * 6 < 1) {
        cv = l + 6 * (s - l) * cv;
      } else if (cv * 2 < 1) {
        cv = s;
      } else if (cv * 3 < 2) {
        cv = l + (s - l) * (2 / 3 - cv) * 6;
      } else {
        cv = l;
      }

      hsl[i] = fmtInt(cv * 255);
    }

    return {
      r: hsl[0],
      g: hsl[1],
      b: hsl[2]
    };
  }; // rgb值转化为hsl值

  var rgb2hsl = function rgb2hsl(_ref6) {
    var r = _ref6.r,
        g = _ref6.g,
        b = _ref6.b;
    r = fmtVal(r) / 255;
    g = fmtVal(g) / 255;
    b = fmtVal(b) / 255;
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var dif = max - min;
    var hue = getHue(max, min, r, g, b, dif);
    hue = Math.min(60 * hue, 360);
    if (hue < 0) hue += 360;
    r = (min + max) / 2;
    var sat = (max === min ? 0 : r <= 0.5 ? dif / (max + min) : dif / (2 - max - min)) * 100;
    return {
      h: fmtInt(hue, 360),
      s: fmtInt(sat, 100),
      l: fmtInt(100 * r, 100)
    };
  }; // cmy值转化为rgb值

  var rgba2rgbByMap = function rgba2rgbByMap(rgba) {
    var _rgba$a;

    var bgMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEF_BG_MAP;
    var alpha = (_rgba$a = rgba.a) !== null && _rgba$a !== void 0 ? _rgba$a : 1;
    var r = Math.round(rgba.r * alpha + bgMap.r * (1 - alpha));
    var g = Math.round(rgba.g * alpha + bgMap.g * (1 - alpha));
    var b = Math.round(rgba.b * alpha + bgMap.b * (1 - alpha));
    return {
      r: r,
      g: g,
      b: b,
      a: undefined
    };
  }; // 把rgba的颜色值，转化为rgb颜色值

  var convertTo = function convertTo(color, method) {
    switch (method) {
      case 'hsv2hsv':
      case 'hsl2hsl':
      case 'rgb2rgb':
        return color;

      case 'rgb2hsl':
        return rgb2hsl(color);

      case 'rgb2hsv':
        return rgb2hsv(color);

      case 'hsl2rgb':
        return hsl2rgb(color);

      case 'hsl2hsv':
        return hsl2hsv(color);

      case 'hsv2rgb':
        return hsv2rgb(color);

      case 'hsv2hsl':
        return hsv2hsl(color);

      default:
        return color;
    }
  }; // 颜色值转换


  var convert = function convert(color, target) {
    var _target;

    target = CM[(_target = target) !== null && _target !== void 0 ? _target : CM.rgb] || CM.rgb;

    if (typeof color === 'string') {
      var _getColorType;

      var type = CM[(_getColorType = getColorType(color)) !== null && _getColorType !== void 0 ? _getColorType : ''];

      if (type) {
        return convertTo(getColorMap(color), "".concat(type, "2").concat(target));
      }
    } else if (_typeof(color) === 'object') {
      if (contains(color, ['r', 'g', 'b'])) {
        return convertTo(color, "rgb2".concat(target));
      } else if (contains(color, ['h', 's', 'l'])) {
        return convertTo(color, "hsl2".concat(target));
      } else if (contains(color, ['h', 's', 'v'])) {
        return convertTo(color, "hsv2".concat(target));
      }
    }

    return color;
  };

  /**
   * RGBA转为RGB
   * RGBA color to RGB
   * @param color RGBA颜色值
   * @param bgColor 背景颜色值，默认白色
   */

  var rgbaToRgb = function rgbaToRgb(color, bgColor) {
    return callback2(color, function (_ref) {
      var r = _ref.r,
          g = _ref.g,
          b = _ref.b;
      return "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
    }, bgColor);
  };
  /**
   * 把颜色值转为RGB
   * The color to RGB
   * @param color 颜色值
   */

  var toRgb = function toRgb(color) {
    return callback(color, function (_ref2) {
      var r = _ref2.r,
          g = _ref2.g,
          b = _ref2.b;
      return "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
    }, 1);
  };
  /**
   * 把颜色值转为RGBA
   * The color to RGBA
   * @param color 颜色值
   * @param alpha 透明度
   */

  var toRgba = function toRgba(color, alpha) {
    return callback(color, function (_ref3) {
      var _ref4;

      var r = _ref3.r,
          g = _ref3.g,
          b = _ref3.b,
          a = _ref3.a;
      return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(fmtVal((_ref4 = alpha !== null && alpha !== void 0 ? alpha : a) !== null && _ref4 !== void 0 ? _ref4 : 1, 1), ")");
    }, alpha);
  };
  /**
   * 把颜色值转为HEX
   * The color to HEX
   * @param color 颜色值
   */

  var toHex = function toHex(color) {
    return callback(color, function (_ref5) {
      var r = _ref5.r,
          g = _ref5.g,
          b = _ref5.b;
      return "#".concat(num2hex(r)).concat(num2hex(g)).concat(num2hex(b));
    }, 1);
  };
  /**
   * 把颜色值转为HEXA
   * The color to HEXA
   * @param color 颜色值
   * @param alpha 透明度
   */

  var toHexa = function toHexa(color, alpha) {
    return callback(color, function (_ref6) {
      var _ref7;

      var r = _ref6.r,
          g = _ref6.g,
          b = _ref6.b,
          a = _ref6.a;
      return "#".concat(num2hex(r)).concat(num2hex(g)).concat(num2hex(b)).concat(pctHex(fmtVal((_ref7 = alpha !== null && alpha !== void 0 ? alpha : a) !== null && _ref7 !== void 0 ? _ref7 : 1, 1)));
    }, alpha);
  };
  /**
   * 把颜色值转为HSV
   * The color to HSV
   * @param color 颜色值
   */

  var toHsv = function toHsv(color) {
    return callback(color, function (_ref8) {
      var r = _ref8.r,
          g = _ref8.g,
          b = _ref8.b;

      var _rgb2hsv = rgb2hsv({
        r: r,
        g: g,
        b: b
      }),
          h = _rgb2hsv.h,
          s = _rgb2hsv.s,
          v = _rgb2hsv.v;

      return "hsv(".concat(h, ", ").concat(Math.round(s), "%, ").concat(Math.round(v), "%)");
    }, 1);
  };
  /**
   * 把颜色值转为HSVA
   * The color to HSVA
   * @param color 颜色值
   * @param alpha 透明度
   */

  var toHsva = function toHsva(color, alpha) {
    return callback(color, function (_ref9) {
      var _ref10;

      var r = _ref9.r,
          g = _ref9.g,
          b = _ref9.b,
          a = _ref9.a;

      var _rgb2hsv2 = rgb2hsv({
        r: r,
        g: g,
        b: b
      }),
          h = _rgb2hsv2.h,
          s = _rgb2hsv2.s,
          v = _rgb2hsv2.v;

      return "hsva(".concat(h, ", ").concat(Math.round(s), "%, ").concat(Math.round(v), "%, ").concat(fmtVal((_ref10 = alpha !== null && alpha !== void 0 ? alpha : a) !== null && _ref10 !== void 0 ? _ref10 : 1, 1), ")");
    }, alpha);
  };
  /**
   * 把颜色值转为HSL
   * The color to HSL
   * @param color 颜色值
   */

  var toHsl = function toHsl(color) {
    return callback(color, function (_ref11) {
      var r = _ref11.r,
          g = _ref11.g,
          b = _ref11.b;

      var _rgb2hsl = rgb2hsl({
        r: r,
        g: g,
        b: b
      }),
          h = _rgb2hsl.h,
          s = _rgb2hsl.s,
          l = _rgb2hsl.l;

      return "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)");
    }, 1);
  };
  /**
   * 把颜色值转为HSLA
   * The color to HSLA
   * @param color 颜色值
   * @param alpha 透明度
   */

  var toHsla = function toHsla(color, alpha) {
    return callback(color, function (_ref12) {
      var _ref13;

      var r = _ref12.r,
          g = _ref12.g,
          b = _ref12.b,
          a = _ref12.a;

      var _rgb2hsl2 = rgb2hsl({
        r: r,
        g: g,
        b: b
      }),
          h = _rgb2hsl2.h,
          s = _rgb2hsl2.s,
          l = _rgb2hsl2.l;

      return "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat(fmtVal((_ref13 = alpha !== null && alpha !== void 0 ? alpha : a) !== null && _ref13 !== void 0 ? _ref13 : 1, 1), ")");
    }, alpha);
  };
  /**
   * 获取颜色灰度值，值越低深度越高
   * Get color depth value，The lower the value, the higher the depth
   * @param color 颜色值
   */

  var getColorGray = function getColorGray(color) {
    return callback(color, function (_ref14) {
      var r = _ref14.r,
          g = _ref14.g,
          b = _ref14.b;
      return fmtInt(r * 0.299 + g * 0.587 + b * 0.114);
    }, 1, -1);
  };
  /**
   * 判断颜色是否是深色
   * Judge whether the color is dark or not
   * @param color 颜色值
   * @param criticalValue 临界值 默认127.5
   */

  var darkColor = function darkColor(color) {
    var criticalValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEF_CRITICAL_VALUE;
    var depth = getColorGray(color);
    if (depth < 0) return undefined;
    return depth < criticalValue;
  };
  /**
   * 判断颜色是否是浅色
   * Judge whether the color is light or not
   * @param color 颜色值
   * @param criticalValue 临界值 默认127.5
   */

  var lightColor = function lightColor(color) {
    var criticalValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEF_CRITICAL_VALUE;
    var depth = getColorGray(color);
    if (depth < 0) return undefined;
    return depth >= criticalValue;
  };

  var tools = /*#__PURE__*/Object.freeze({
    __proto__: null,
    rgbaToRgb: rgbaToRgb,
    toRgb: toRgb,
    toRgba: toRgba,
    toHex: toHex,
    toHexa: toHexa,
    toHsv: toHsv,
    toHsva: toHsva,
    toHsl: toHsl,
    toHsla: toHsla,
    getColorGray: getColorGray,
    darkColor: darkColor,
    lightColor: lightColor
  });

  var index = _objectSpread2(_objectSpread2({}, tools), {}, {
    isColor: isColor,
    convert: convert,
    getColorMap: getColorMap,
    formatColor: formatColor,
    version: '1.0.13'
  });

  exports.convert = convert;
  exports.darkColor = darkColor;
  exports["default"] = index;
  exports.formatColor = formatColor;
  exports.getColorGray = getColorGray;
  exports.getColorMap = getColorMap;
  exports.isColor = isColor;
  exports.lightColor = lightColor;
  exports.rgbaToRgb = rgbaToRgb;
  exports.toHex = toHex;
  exports.toHexa = toHexa;
  exports.toHsl = toHsl;
  exports.toHsla = toHsla;
  exports.toHsv = toHsv;
  exports.toHsva = toHsva;
  exports.toRgb = toRgb;
  exports.toRgba = toRgba;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.js.map
