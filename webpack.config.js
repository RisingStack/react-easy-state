const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    easyState: './src/easyState.js',
    helloWorld: './examples/helloWorld/App.jsx',
    simpleTodos: './examples/simpleTodos/App.jsx',
    todoMVC: './examples/todoMVC/App.jsx'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'stage-0'],
            plugins: ['transform-decorators-legacy']
          }
        }
      },
      {
        test: /\.js$/,
        include: [path.join(__dirname, 'examples')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['stage-0']
          }
        }
      }
    ]
  }
}
