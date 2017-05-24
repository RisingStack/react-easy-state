const internals = new Set([
  'constructor',
  'render',
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount'
])

export default function autoBind (context, proto) {
  for (let key of Object.getOwnPropertyNames(proto)) {
    const value = proto[key]

    if (typeof value === 'function' && !internals.has(key)) {
      context[key] = value.bind(context)
    }
  }
}
