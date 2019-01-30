module.exports = process.env.NATIVE
  ? require('react-native')
  : require('react-dom')
