const path = require('path');
const replacePlugin = require('rollup-plugin-replace');
const {
  default: resolvePlugin,
} = require('@rollup/plugin-node-resolve');
const babelPlugin = require('rollup-plugin-babel');
const externalsPlugin = require('rollup-plugin-auto-external');

// this is also used in watch mode by the startExample script
const defaultBuild = [
  {
    input: path.resolve('src/platforms/dom.js'),
    external: ['react-dom'],
    output: [
      {
        format: 'es',
        dir: 'dist',
        entryFileNames: 'react-platform.js',
      },
      {
        format: 'cjs',
        dir: 'dist',
        entryFileNames: 'react-platform.cjs.js',
      },
    ],
  },
  {
    input: path.resolve('src/index.js'),
    external: ['./react-platform'],
    plugins: [
      replacePlugin({ 'react-platform': './react-platform' }),
      resolvePlugin(),
      babelPlugin({ exclude: 'node_modules/**' }),
      externalsPlugin({ dependencies: true, peerDependecies: true }),
    ],
    output: {
      format: 'es',
      dir: 'dist',
      entryFileNames: 'bundle.js',
      sourcemap: true,
    },
  },
];

const allBuilds = [
  ...defaultBuild,
  {
    input: path.resolve('src/platforms/native.js'),
    external: ['react-native'],
    output: [
      {
        format: 'es',
        dir: 'dist',
        entryFileNames: 'react-platform.native.js',
      },
      {
        format: 'cjs',
        dir: 'dist',
        entryFileNames: 'react-platform.cjs.native.js',
      },
    ],
  },
  {
    input: path.resolve('src/index.js'),
    external: ['./react-platform.cjs'],
    plugins: [
      replacePlugin({ 'react-platform': './react-platform.cjs' }),
      resolvePlugin(),
      babelPlugin({ exclude: 'node_modules/**' }),
      externalsPlugin({ dependencies: true, peerDependecies: true }),
    ],
    output: {
      format: 'cjs',
      dir: 'dist',
      entryFileNames: 'bundle.cjs.js',
      sourcemap: true,
    },
  },
];

// this is used by the runExample script
allBuilds.defaultBuild = defaultBuild;
// this has to be exported as default for rollup CLI to pick it up
module.exports = allBuilds;
