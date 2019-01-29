module.exports = {
  env: {
    development: {
      plugins: [
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-class-properties'
      ]
    },
    test: {
      presets: ['@babel/preset-react'],
      plugins: [
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-async-to-generator',
        '@babel/plugin-transform-modules-commonjs'
      ]
    }
  }
}
