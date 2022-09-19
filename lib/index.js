"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = __importDefault(require("./color"));
exports.default = Object.assign(Object.assign({ version: '1.0.6' }, color_1.default), { convert(color, target) {
        if (color_1.default.isColor(color)) {
            const key = `to${target[0].toUpperCase()}${target.slice(1).toLowerCase()}`;
            const fn = color_1.default[key];
            if (typeof fn === 'function') {
                return fn(color);
            }
            return color;
        }
        return color;
    } });
//# sourceMappingURL=index.js.map