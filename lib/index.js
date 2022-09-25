"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorMap = exports.formatColor = exports.isColor = exports.convert = void 0;
const tools = __importStar(require("./color"));
const converts_1 = require("./converts");
const utils_1 = require("./utils");
__exportStar(require("./color"), exports);
var converts_2 = require("./converts");
Object.defineProperty(exports, "convert", { enumerable: true, get: function () { return converts_2.convert; } });
var utils_2 = require("./utils");
Object.defineProperty(exports, "isColor", { enumerable: true, get: function () { return utils_2.isColor; } });
Object.defineProperty(exports, "formatColor", { enumerable: true, get: function () { return utils_2.formatColor; } });
Object.defineProperty(exports, "getColorMap", { enumerable: true, get: function () { return utils_2.getColorMap; } });
exports.default = Object.assign(Object.assign({}, tools), { isColor: utils_1.isColor,
    convert: converts_1.convert,
    getColorMap: utils_1.getColorMap,
    formatColor: utils_1.formatColor, version: '1.0.12-alpha.3' });
//# sourceMappingURL=index.js.map