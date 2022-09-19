import tools from '../src/index'
import testListMap from './data'

test('转为HSL：', () => {
  testListMap.forEach(({ value, hsl }) => {
    expect(tools.toHsl(value)).toBe(hsl)
  })
})
