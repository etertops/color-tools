import tools from '../src/index'
import testListMap from './data'

test('转为RGBA：', () => {
  testListMap.forEach(({ value, rgba, alpha }) => {
    expect(tools.toRgba(value, alpha)).toBe(rgba)
  })
})
