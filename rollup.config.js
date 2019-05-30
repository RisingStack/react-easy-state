import path from 'path'
import replacePlugin from 'rollup-plugin-replace'
import resolvePlugin from 'rollup-plugin-node-resolve'
import babelPlugin from 'rollup-plugin-babel'
import externalsPlugin from 'rollup-plugin-auto-external'

export default [
  {
    input: path.resolve('src/platforms/dom.js'),
    external: ['react-dom'],
    output: [
      {
        format: 'es',
        dir: 'dist',
        entryFileNames: 'react-platform.js'
      },
      {
        format: 'cjs',
        dir: 'dist',
        entryFileNames: 'react-platform.cjs.js'
      }
    ]
  },
  {
    input: path.resolve('src/platforms/native.js'),
    external: ['react-native'],
    output: [
      {
        format: 'es',
        dir: 'dist',
        entryFileNames: 'react-platform.native.js'
      },
      {
        format: 'cjs',
        dir: 'dist',
        entryFileNames: 'react-platform.cjs.native.js'
      }
    ]
  },
  {
    input: path.resolve('src/index.js'),
    external: ['./react-platform'],
    plugins: [
      replacePlugin({ 'react-platform': './react-platform' }),
      resolvePlugin(),
      babelPlugin({ exclude: 'node_modules/**' }),
      externalsPlugin({ dependencies: true, peerDependecies: true })
    ],
    output: {
      format: 'es',
      dir: 'dist',
      entryFileNames: 'es.es6.js',
      sourcemap: true
    }
  },
  {
    input: path.resolve('src/index.js'),
    external: ['./react-platform'],
    plugins: [
      replacePlugin({ 'react-platform': './react-platform' }),
      resolvePlugin(),
      babelPlugin({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env']
      }),
      externalsPlugin({ dependencies: true, peerDependecies: true })
    ],
    output: {
      format: 'es',
      dir: 'dist',
      entryFileNames: 'es.es5.js',
      sourcemap: true
    }
  },
  {
    input: path.resolve('src/index.js'),
    external: ['./react-platform.cjs'],
    plugins: [
      replacePlugin({ 'react-platform': './react-platform.cjs' }),
      resolvePlugin(),
      babelPlugin({ exclude: 'node_modules/**' }),
      externalsPlugin({ dependencies: true, peerDependecies: true })
    ],
    output: {
      format: 'cjs',
      dir: 'dist',
      entryFileNames: 'cjs.es6.js',
      sourcemap: true
    }
  },
  {
    input: path.resolve('src/index.js'),
    external: ['./react-platform.cjs'],
    plugins: [
      replacePlugin({ 'react-platform': './react-platform.cjs' }),
      resolvePlugin(),
      babelPlugin({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env']
      }),
      externalsPlugin({ dependencies: true, peerDependecies: true })
    ],
    output: {
      format: 'cjs',
      dir: 'dist',
      entryFileNames: 'cjs.es5.js',
      sourcemap: true
    }
  }
]
