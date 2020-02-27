import path from 'path';
import resolvePlugin from '@rollup/plugin-node-resolve';
import babelPlugin from 'rollup-plugin-babel';
import externalsPlugin from 'rollup-plugin-auto-external';

export default [
  {
    input: path.resolve('src/index.js'),
    plugins: [
      resolvePlugin(),
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
    input: path.resolve('src/index.js'),
    plugins: [
      resolvePlugin(),
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
    plugins: [
      resolvePlugin(),
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
    plugins: [
      resolvePlugin(),
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
