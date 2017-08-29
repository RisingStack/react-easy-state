import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: './src/index.js',
  output: [
    { file: 'dist/cjs.es6.js', format: 'cjs' },
    { file: 'dist/esm.es6.js', format: 'es' }
  ],
  plugins: [
    resolve(),
    babel()
  ],
  external: ['react']
}
