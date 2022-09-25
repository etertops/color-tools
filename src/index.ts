import * as tools from './color'
import { convert } from './converts'
import { isColor, formatColor, getColorMap } from './utils'

export * from './color'
export { convert } from './converts'
export { isColor, formatColor, getColorMap } from './utils'

export default {
  ...tools,
  isColor,
  convert,
  getColorMap,
  formatColor,
  version: '1.0.12-alpha.3'
}
