const path = require('path')

module.exports = {
  entry: {
    clock: './examples/clock',
    todoMVC: './examples/todoMVC',
    contacts: './examples/contacts'
  },
  output: {
    path: path.join(__dirname, 'examples'),
    filename: '[name]/dist/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      'react-easy-state': path.join(__dirname, 'src')
    }
  }
}
