import { IColor, IHsl, IHsv } from './interface';
export declare const decomposeRgba: (color: string) => IColor;
export declare const decomposeHexa: (color: string) => IColor;
export declare const decomposeHsla: (color: string) => IHsl;
export declare const decomposeHslaToRgba: (color: string) => IColor;
export declare const decomposeHsva: (color: string) => IHsv;
export declare const decomposeHsvaToRgba: (color: string) => IColor;
