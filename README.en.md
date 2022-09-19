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

2.  Used
```javascript
import { convert, toRgb, rgbaToRgb } from "@etertops/color-tools"

convert('#05f', 'rgb') // rgb(0, 85, 255)

toRgb('#05f') // rgb(0, 85, 255)

rgbaToRgb('rgba(0, 0, 0, .5)') // rgb(128, 128, 128)
rgbaToRgb('rgba(0, 0, 0, .5)', 'rgb(128, 24, 46)') // 'rgb(64, 12, 23)'

```

#### Contribution

1.  Fork the repository
2.  Create Feat_xxx branch
3.  Commit your code
4.  Create Pull Request
