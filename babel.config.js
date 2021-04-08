const development = {
  // the library itself has no jsx code inside it
  // so it does not need preset-react
  presets: ['@babel/preset-env'],
};

const test = {
  // the tests include jsx code and require preset-react
  presets: ['@babel/preset-react', '@babel/preset-env'],
};

module.exports = {
  env: { development, test },
};
