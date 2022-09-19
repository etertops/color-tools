import tools from '../src/index'
import testListMap from './data'

test('转为HSLA：', () => {
  testListMap.forEach(({ value, hsla, alpha }) => {
    expect(tools.toHsla(value, alpha)).toBe(hsla)
  })
})
