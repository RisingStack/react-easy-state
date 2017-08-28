const pkg = require('./package.json')
const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')

export default {
  input: './src/index.js',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [
    resolve(),
    babel()
  ],
  external: ['react']
}
