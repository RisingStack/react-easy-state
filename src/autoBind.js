const reactInternals = new Set([
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

export default function autoBind (context, proto, isReact) {
  for (let key of Object.getOwnPropertyNames(proto)) {
    const value = proto[key]

    if (typeof value === 'function' && !(isReact && reactInternals.has(key))) {
      context[key] = value.bind(context)
    }
  }
}
