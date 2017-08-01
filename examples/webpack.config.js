const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    clock: './examples/clock/App.jsx',
    todoMVC: './examples/todoMVC/App.jsx',
    contacts: './examples/contacts/App.jsx',

  },
  output: {
    path: __dirname,
    filename: '[name]/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'stage-0']
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
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  }
}
