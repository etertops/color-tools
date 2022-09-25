import tools from '../src/index'

test('测试RGBA转为RGB：', () => {
  expect(tools.rgbaToRgb('rgba(0, 0, 0, .5)')).toBe('rgb(128, 128, 128)')
  expect(tools.rgbaToRgb('rgba(0, 0, 0, .5)', 'rgb(128, 24, 46)')).toBe('rgb(64, 12, 23)')
})
