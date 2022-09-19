import tools from '../src/index'
import testListMap from './data'

test('转为HEX：', () => {
  testListMap.forEach(({ value, hex }) => {
    expect(tools.toHex(value)).toBe(hex)
  })
})
