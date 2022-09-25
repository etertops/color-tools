export * from './color';
export { convert } from './converts';
export { isColor, formatColor, getColorMap } from './utils';
declare const _default: {
    isColor: (color: string, type?: string | undefined) => boolean;
    convert: (color: string | import("./interface").IColor | import("./interface").IHsl | import("./interface").IHsv, target?: string | undefined) => string | import("./interface").IColor | import("./interface").IHsl | import("./interface").IHsv;
    getColorMap: (color: string) => import("./interface").IColor | import("./interface").IHsl | import("./interface").IHsv;
    formatColor: (color: string) => string;
    version: string;
    rgbaToRgb: (color: string, bgColor?: string | undefined) => string;
    toRgb: (color: string) => string;
    toRgba: (color: string, alpha?: number | undefined) => string;
    toHex: (color: string) => string;
    toHexa: (color: string, alpha?: number | undefined) => string;
    toHsv: (color: string) => string;
    toHsva: (color: string, alpha?: number | undefined) => string;
    toHsl: (color: string) => string;
    toHsla: (color: string, alpha?: number | undefined) => string;
    getColorGray: (color: string) => number;
    darkColor: (color: string, criticalValue?: number) => boolean | undefined;
    lightColor: (color: string, criticalValue?: number) => boolean | undefined;
};
export default _default;
