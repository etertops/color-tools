import tools from '../src/index'

test('转为RGBA：', () => {
  expect(tools.getColorDepth('#00000080')).toBe(128)
  expect(tools.getColorDepth('#ffffff')).toBe(255)
  expect(tools.getColorDepth('#000000')).toBe(0)
  expect(tools.getColorDepth('#0055ff')).toBe(79)
  expect(tools.darkColor('#0055ff', 127.5)).toBe(true)
  expect(tools.lightColor('#0055ff', 127.5)).toBe(false)
  expect(tools.darkColor('#00000080', 127.5)).toBe(false)
  expect(tools.lightColor('#00000080', 127.5)).toBe(true)
  expect(tools.darkColor('#e5e5e5', 127.5)).toBe(false)
  expect(tools.lightColor('#e5e5e5', 127.5)).toBe(true)
})
