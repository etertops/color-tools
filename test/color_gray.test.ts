import { getColorGray, darkColor, lightColor } from '../src/index'

test('测试颜色灰度值与颜色深浅：', () => {
  expect(getColorGray('#00000080')).toBe(128)
  expect(getColorGray('#ffffff')).toBe(255)
  expect(getColorGray('#000000')).toBe(0)
  expect(getColorGray('#0055ff')).toBe(79)
  expect(darkColor('#0055ff', 127.5)).toBe(true)
  expect(darkColor('#0055ff', 70)).toBe(false)
  expect(darkColor('#00000080', 127.5)).toBe(false)
  expect(darkColor('#e5e5e5', 127.5)).toBe(false)
  expect(lightColor('#0055ff', 127.5)).toBe(false)
  expect(lightColor('#0055ff', 70)).toBe(true)
  expect(lightColor('#00000080', 127.5)).toBe(true)
  expect(lightColor('#e5e5e5', 127.5)).toBe(true)
})
