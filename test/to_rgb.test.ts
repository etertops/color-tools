import tools from '../src/index'
import testListMap from './data'

test('转为RGB：', () => {
  testListMap.forEach(({ value, rgb }) => {
    expect(tools.toRgb(value)).toBe(rgb)
  })
})
