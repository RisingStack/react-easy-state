const path = require('path');

const bundleName = process.env.BUNDLE;
const bundlePath = path.resolve(
  bundleName ? `dist/${bundleName}` : 'src/index.js',
);

// eslint-disable-next-line import/no-dynamic-require
module.exports = require(bundlePath);
