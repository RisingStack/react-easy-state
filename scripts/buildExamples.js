const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const minify = require('rollup-plugin-babel-minify')
const replace = require('rollup-plugin-replace')
const alias = require('rollup-plugin-alias')

const examplesPath = path.resolve('examples')

const plugins = [
  replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
  resolve({ extensions: [ '.js', '.json', '.jsx' ] }),
  alias({
    'react-easy-state': path.resolve('src', 'index.js')
  }),
  babel({ exclude: 'node_modules/**' }),
  commonjs({
    namedExports: { 'node_modules/react/react.js': ['Component'] }
  })
  // minify({ comments: false })
]

const examples = fs
  .readdirSync(examplesPath)
  .filter(dir => fs.statSync(path.join(examplesPath, dir)).isDirectory())

async function buildExamples () {
  for (let example of examples) {
    const bundle = await rollup.rollup({
      input: path.join(examplesPath, example, 'index.jsx'),
      plugins
    })

    await bundle.write({
      file: path.join(examplesPath, example, 'dist', 'bundle.js'),
      format: 'iife',
      name: example
    })
    console.log(`Successfully built ${example}`)
  }
}

buildExamples()
