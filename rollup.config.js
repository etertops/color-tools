import babel from '@rollup/plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.ts',
  output: [
    // { file: 'dist/index.es.js', format: 'es', sourcemap: true, name: 'ColorTools' },
    // { file: 'dist/index.amd.js', format: 'amd', sourcemap: true, name: 'ColorTools' },
    // { file: 'dist/index.cjs.js', format: 'cjs', sourcemap: true, name: 'ColorTools' },
    // { file: 'dist/index.life.js', format: 'life', sourcemap: true, name: 'ColorTools' },
    // { file: 'dist/index.system.js', format: 'system', sourcemap: true, name: 'ColorTools' },
    { file: 'dist/index.umd.js', format: 'umd', sourcemap: true, name: 'ColorTools' }
  ],
  plugins: [
    uglify(),
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
