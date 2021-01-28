const path = require('path');
const replacePlugin = require('rollup-plugin-replace');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const babelPlugin = require('rollup-plugin-babel');
const externalsPlugin = require('rollup-plugin-auto-external');

module.exports = [
  // First two elements are also used in watch mode by the startExample script
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
      nodeResolve(),
      babelPlugin({ exclude: 'node_modules/**' }),
      externalsPlugin({ dependencies: true, peerDependecies: true }),
    ],
    output: {
      format: 'es',
      dir: 'dist',
      entryFileNames: 'es.es6.js',
      sourcemap: true,
    },
  },
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
    external: ['./react-platform'],
    plugins: [
      replacePlugin({ 'react-platform': './react-platform' }),
      nodeResolve(),
      babelPlugin({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env'],
      }),
      externalsPlugin({ dependencies: true, peerDependecies: true }),
    ],
    output: {
      format: 'es',
      dir: 'dist',
      entryFileNames: 'es.es5.js',
      sourcemap: true,
    },
  },
  {
    input: path.resolve('src/index.js'),
    external: ['./react-platform.cjs'],
    plugins: [
      replacePlugin({ 'react-platform': './react-platform.cjs' }),
      nodeResolve(),
      babelPlugin({ exclude: 'node_modules/**' }),
      externalsPlugin({ dependencies: true, peerDependecies: true }),
    ],
    output: {
      format: 'cjs',
      dir: 'dist',
      entryFileNames: 'cjs.es6.js',
      sourcemap: true,
    },
  },
  {
    input: path.resolve('src/index.js'),
    external: ['./react-platform.cjs'],
    plugins: [
      replacePlugin({ 'react-platform': './react-platform.cjs' }),
      nodeResolve(),
      babelPlugin({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env'],
      }),
      externalsPlugin({ dependencies: true, peerDependecies: true }),
    ],
    output: {
      format: 'cjs',
      dir: 'dist',
      entryFileNames: 'cjs.es5.js',
      sourcemap: true,
    },
  },
];
