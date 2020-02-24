module.exports = process.env.NOHOOK
  ? require('no-hook-react-dom')
  : require('react-dom');
