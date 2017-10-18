// do not bind these, they should not be directly invoked or passed as callbacks by the user
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

// bind the methods from proto to the passed context object and assign them to the context
export default function autoBind (context, proto, isReact) {
  for (let key of Object.getOwnPropertyNames(proto)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, key)

    // do not try to bind properties and getter/setters
    if (typeof descriptor.value === 'function' && !(isReact && reactInternals.has(key))) {
      // use the same descriptor for the copied method to keep the exact same behavior
      const newDescriptor = Object.assign({}, descriptor, { value: descriptor.value.bind(context) })
      Object.defineProperty(context, key, newDescriptor)
    }
  }
}
