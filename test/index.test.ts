import tools from '../src/index'

// console.log(process.argv, process.argv.length)

test('获取版本值：', () => {
  expect(tools.version).toBe(tools.version)
})
