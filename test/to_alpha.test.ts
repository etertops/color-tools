import { toHex, toHexa, toHsva, toHsla, toRgba } from '../src'

test('测试alpha值转换：', () => {
  expect(toHex('#33333380')).toBe('#999999')
  expect(toHexa('#33333380')).toBe('#33333380')
  expect(toRgba('#33333380')).toBe('rgba(51, 51, 51, 0.5)')
  expect(toHsva('#33333380')).toBe('hsva(0, 0%, 20%, 0.5)')
  expect(toHsla('#33333380')).toBe('hsla(0, 0%, 20%, 0.5)')
  expect(toHexa('#33333380', 0.8)).toBe('#999999cc')
  expect(toRgba('#33333380', 0.8)).toBe('rgba(153, 153, 153, 0.8)')
  expect(toHsva('#33333380', 0.8)).toBe('hsva(0, 0%, 60%, 0.8)')
  expect(toHsla('#33333380', 0.8)).toBe('hsla(0, 0%, 60%, 0.8)')
})
