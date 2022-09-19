import tools from './color'

export default {
  version: '1.0.1',
  ...tools,
  convert(color: string, target: string): any {
    if (tools.isColor(color)) {
      const key = `to${target[0].toUpperCase()}${target.slice(1).toLowerCase()}`
      const fn = tools[key]
      if (typeof fn === 'function') {
        return fn(color)
      }
      return color
    }
    return color
  }
}
