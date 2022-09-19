import tools from '../src/index'
import testListMap from './data'

test('转为HSV：', () => {
  testListMap.forEach(({ value, hsv }) => {
    expect(tools.toHsv(value)).toBe(hsv)
  })
})
