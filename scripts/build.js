const path = require('path')
const rollup = require('rollup')
const replacePlugin = require('rollup-plugin-replace')
const resolvePlugin = require('rollup-plugin-node-resolve')
const babelPlugin = require('rollup-plugin-babel')
const externalsPlugin = require('rollup-plugin-auto-external')

const bundles = [
  {
    input: {
      input: path.resolve('src/index.js'),
      external: ['./react-platform'],
      plugins: [
        replacePlugin({ 'react-platform': './react-platform' }),
        resolvePlugin(),
        babelPlugin({ exclude: 'node_modules/**' }),
        externalsPlugin({ dependencies: true, peerDependecies: true })
      ]
    },
    output: {
      format: 'es',
      dir: 'dist',
      entryFileNames: 'es.es6.js',
      sourcemap: true
    }
  },
  {
    input: {
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
      ]
    },
    output: {
      format: 'es',
      dir: 'dist',
      entryFileNames: 'es.es5.js',
      sourcemap: true
    }
  },
  {
    input: {
      input: path.resolve('src/index.js'),
      external: ['./react-platform.cjs'],
      plugins: [
        replacePlugin({ 'react-platform': './react-platform.cjs' }),
        resolvePlugin(),
        babelPlugin({ exclude: 'node_modules/**' }),
        externalsPlugin({ dependencies: true, peerDependecies: true })
      ]
    },
    output: {
      format: 'cjs',
      dir: 'dist',
      entryFileNames: 'cjs.es6.js',
      sourcemap: true
    }
  },
  {
    input: {
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
      ]
    },
    output: {
      format: 'cjs',
      dir: 'dist',
      entryFileNames: 'cjs.es5.js',
      sourcemap: true
    }
  }
]

async function build () {
  // Compile source code into a distributable format with Babel and Rollup
  for (const config of bundles) {
    const bundle = await rollup.rollup(config.input)
    await bundle.write(config.output)
  }
}

build()
