const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const examplesPath = path.resolve('examples')

const examples = fs
  .readdirSync(examplesPath)
  .filter(dir => fs.statSync(path.join(examplesPath, dir)).isDirectory())

const entry = {}
for (let example of examples) {
  entry[example] = path.join(examplesPath, example)
}

const compiler = webpack({
  entry,
  output: {
    path: examplesPath,
    filename: '[name]/dist/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      'react-easy-state': path.resolve('src')
    }
  }
})

if (process.argv.indexOf('--watch') === -1) {
  compiler.run(printResults)
} else {
  compiler.watch({}, printResults)
}

function printResults (err, stats) {
  console.log(stats.toString({ colors: true }))
  if (err) {
    console.error(err)
  }
}
