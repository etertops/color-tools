import { IHsv, IHsl, IColor, ICmy } from './interface';
export declare const hsl2hsv: (hue: number, sat: number, light: number) => IHsv;
export declare const hsv2hsl: (hue: number, sat: number, value: number) => IHsl;
export declare const rgb2hsv: (red: number, green: number, blue: number) => IHsv;
export declare const hsv2rgb: (hue: number, sat: number, value: number) => IColor;
export declare const hsl2rgb: (hue: number, saturation: number, lightness: number) => IColor;
export declare const rgb2hsl: (red: number, green: number, blue: number) => IHsl;
export declare const cmy2rgb: (cyan: number, magenta: number, yellow: number) => ICmy;
export declare const rgb2cmy: (r: number, g: number, b: number) => IColor;
export declare const rgba2rgb: (color: string, bgColor?: string) => IColor;
export declare const alpha2rgb: (color: string) => IColor;
//# sourceMappingURL=converts.d.ts.map