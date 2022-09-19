# color-tools

#### 介绍
color-tools 用来转换颜色之间的值

#### 软件架构
用于转化不同类型的颜色值，目前支持rgb、hex、hsl、hsv四中颜色的相互转换


#### 安装教程

1.  安装
```text
npm i @etertops/color-tools

yarn add @etertops/color-tools

```

2.  使用
```javascript
import { convert, toRgb, rgbaToRgb } from "@etertops/color-tools"

convert('#05f', 'rgb') // rgb(0, 85, 255)

toRgb('#05f') // rgb(0, 85, 255)

rgbaToRgb('rgba(0, 0, 0, .5)') // rgb(128, 128, 128)
rgbaToRgb('rgba(0, 0, 0, .5)', 'rgb(128, 24, 46)') // 'rgb(64, 12, 23)'

```

#### 使用说明

1.  xxxx
2.  xxxx
3.  xxxx

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request
