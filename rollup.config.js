import babel from '@rollup/plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/index.js',
    format: 'umd',
    name: 'ColorTools'
  },
  plugins: [
    resolve({
      extensions: ['.ts', '.js']
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.ts', '.js'],
      presets: ['@babel/preset-env', '@babel/preset-typescript']
    })
  ]
}
