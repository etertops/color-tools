# color-tools

#### Description
color-tools

#### Software Architecture
Used to convert different types of color values

#### Installation

1.  Installation
```text
npm i @etertops/color-tools

yarn add @etertops/color-tools

```

#### Instructions

1. Instructions
```javascript
import { convert, toRgb, toHex, rgbaToRgb, getColorGray, darkColor } from "@etertops/color-tools"

convert('#05f', 'rgb') // { r: 0, g: 85, b: 255 }
convert('#05f', 'hsl') // { h: 220, s: 100, l: 50 }
convert('#05f', 'hsv') // { h: 220, s: 100, l: 100 }

toRgb('#05f') // "rgb(0, 85, 255)"
toHex('rgb(0, 85, 255)') // "#0055ff"

getColorGray('rgb(0, 85, 255)') // 79

darkColor('rgb(0, 85, 255)') // true
darkColor('rgb(0, 85, 255)', 78) // false

rgbaToRgb('rgba(0, 0, 0, .5)') // "rgb(128, 128, 128)"
rgbaToRgb('rgba(0, 0, 0, .5)', 'rgb(128, 24, 46)') // "rgb(64, 12, 23)"

```

#### Contribution

1.  Fork the repository
2.  Create Feat_xxx branch
3.  Commit your code
4.  Create Pull Request
