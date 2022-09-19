import tools from '../src/index'
import testListMap from './data'

test('转为HSVA：', () => {
  testListMap.forEach(({ value, hsva, alpha }) => {
    expect(tools.toHsva(value, alpha)).toBe(hsva)
  })
})
