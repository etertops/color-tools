import tools from '../src/index'
import testListMap from './data'

test('转为HEXA：', () => {
  testListMap.forEach(({ value, hexa, alpha }) => {
    expect(tools.toHexa(value, alpha)).toBe(hexa)
  })
})
