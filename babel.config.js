const development = {
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
};
const test = {
  presets: ['@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-object-rest-spread',
  ],
};

const bundle = process.env.BUNDLE;
if (bundle && bundle.indexOf('es5') !== -1) {
  test.presets.push('@babel/preset-env');
}

module.exports = {
  env: { development, test },
};
