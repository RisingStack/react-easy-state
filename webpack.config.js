const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'easyState.js',
    libraryTarget: 'umd'
  },
  externals: {
    react: 'react'
  }
}
