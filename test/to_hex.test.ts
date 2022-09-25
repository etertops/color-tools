import tools from '../src/index'
import testListMap from './data'

test('测试将其他颜色值转为HEX：', () => {
  testListMap.forEach(({ value, hex }) => {
    expect(tools.toHex(value)).toBe(hex)
  })
})
