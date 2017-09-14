const path = require('path')

const bundleName = process.env.BUNDLE
const bundlePath = path.resolve(
  bundleName ? `dist/${bundleName}` : 'src/index.js'
)

module.exports = require(bundlePath)
