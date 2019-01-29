import batchedUpdates from './batchedUpdates'

// this runs the passed function and delays all re-renders
// until the function is finished running
export function batch(fn, ctx, args) {
  let result
  batchedUpdates(() => (result = fn.apply(ctx, args)))
  return result
}

// this creates and returns a batched version of the passed function
// the cache is necessary to always map the same thing to the same function
// which makes sure that addEventListener/removeEventListener pairs don't break
const cache = new Map()
function batchFn(fn) {
  if (typeof fn !== 'function') {
    return fn
  }
  let batched = cache.get(fn)
  if (!batched) {
    batched = function(...args) {
      return batch(fn, this, args)
    }
    cache.set(fn, batched)
  }
  return batched
}

// batched window.addEventListener(cb) like callbacks
function batchCallbacks(functionWithCallbacks) {
  return function batchedCallbacks(...args) {
    return functionWithCallbacks.apply(this, args.map(batchFn))
  }
}

// batches obj.onevent = fn like calls
function batchMethod(obj, method) {
  const descriptor = Object.getOwnPropertyDescriptor(obj, method)
  if (descriptor) {
    const newDescriptor = Object.assign({}, descriptor, {
      set(value) {
        return descriptor.set.call(this, batchFn(value))
      }
    })
    Object.defineProperty(obj, method, newDescriptor)
  }
}

// try to find the global object
// it is window in the DOM and global in NodeJS and React Native
let globalObj
if (typeof window !== 'undefined') {
  globalObj = window
} else if (typeof global !== 'undefined') {
  globalObj = global
}

// do a sync batching for the most common task sources
// this should be removed when React's own batching is improved in the future
if (globalObj) {
  // batch timer functions
  globalObj.setTimeout = batchCallbacks(globalObj.setTimeout)
  globalObj.setInterval = batchCallbacks(globalObj.setInterval)
  if (globalObj.requestAnimationFrame) {
    globalObj.requestAnimationFrame = batchCallbacks(
      globalObj.requestAnimationFrame
    )
  }
  if (globalObj.requestIdleCallback) {
    globalObj.requestIdleCallback = batchCallbacks(
      globalObj.requestIdleCallback
    )
  }

  // eslint-disable-next-line
  Promise.prototype.then = batchCallbacks(Promise.prototype.then)
  // eslint-disable-next-line
  Promise.prototype.catch = batchCallbacks(Promise.prototype.catch)

  // batch addEventListener calls
  if (globalObj.EventTarget) {
    EventTarget.prototype.addEventListener = batchCallbacks(
      EventTarget.prototype.addEventListener
    )
    EventTarget.prototype.removeEventListener = batchCallbacks(
      EventTarget.prototype.removeEventListener
    )
  }

  // this batches websocket event handlers
  if (globalObj.WebSocket) {
    const websocketHandlers = ['onopen', 'onmessage', 'onerror', 'onclose']
    websocketHandlers.forEach(method =>
      batchMethod(globalObj.WebSocket.prototype, method)
    )
  }
  // HTTP event handlers are usually wrapped by Promises, which is covered above
}
