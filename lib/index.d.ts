declare const _default: {
    convert(color: string, target: string): any;
    isColor: (color: string, type?: string | undefined) => boolean;
    rgbaToRgb: (color: string, bgColor?: string) => string;
    toRgb: (color: string) => string;
    toRgba: (color: string, alpha?: number | undefined) => string;
    toHex: (color: string) => string;
    toHexa: (color: string, alpha?: number | undefined) => string;
    toHsv: (color: string) => string;
    toHsva: (color: string, alpha?: number | undefined) => string;
    toHsl: (color: string) => string;
    toHsla: (color: string, alpha?: number | undefined) => string;
    getColorDepth: (color: string) => number | undefined;
    darkColor: (color: string, criticalValue?: number) => boolean | undefined;
    lightColor: (color: string, criticalValue: number) => boolean | undefined;
    version: string;
};
export default _default;
