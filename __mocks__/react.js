// this is here to avoid duplicate react entries in the examples
// (one from the example's node_modules and one from the root's node_modules)

module.exports = process.env.NOHOOK
  ? require('no-hook-react')
  : require('react');
