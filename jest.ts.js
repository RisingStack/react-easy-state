module.exports = {
  globals: {
    'ts-jest': {
      babelConfig: 'babel.config.js',
      tsConfig: './examples/using-typescript/tsconfig.json',
    },
  },
  setupFilesAfterEnv: ['./scripts/testSetup.js'],
  testURL: 'http://react-easy-state.com',
  testRegex: '\\.test\\.tsx?$',
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageReporters: ['text'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    'examples/**/*.{ts,tsx}',
  ],
  coverageDirectory: 'coverage',
};
