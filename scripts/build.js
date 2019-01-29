const fs = require('fs')
const path = require('path')
const del = require('del')
const babel = require('@babel/core')
const buble = require('buble')
const rollup = require('rollup')
const resolvePlugin = require('rollup-plugin-node-resolve')
const babelPlugin = require('rollup-plugin-babel')
const externalsPlugin = require('rollup-plugin-auto-external')

const bundles = [
  {
    input: {
      input: path.resolve('src/index.js'),
      plugins: [
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
      plugins: [
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
      plugins: [
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
      plugins: [
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

async function build() {
  // Clean up the output directory
  await del(path.resolve('dist'))
  fs.mkdirSync(path.resolve('dist'))

  // Compile source code into a distributable format with Babel and Rollup
  for (const config of bundles) {
    const bundle = await rollup.rollup(config.input)
    await bundle.write(config.output)
  }
}

build()
