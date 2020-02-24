module.exports = process.env.NOHOOK
  ? require('no-hook-react-testing-library')
  : require('@testing-library/react/pure');
