const tasks = []
let batchCount = 0

// scheduled renders should run in first run order not register order
// to guarantee the parent - child ordering
// maybe add a priority num (incremental to the updater)
// and order them by this num before running them
// use a sparse array instead of a set -> will work perfectly!!
// each fn will have a simple id -> it will be ordered and uniqueu
export function add(task) {
  if (batchCount !== 0) {
    tasks[task.priority] = task
  } else {
    runTask(task)
  }
}

export function remove(task) {
  delete tasks[task.priority]
}

// must remove the task before executing it
// otherwise executed task could start a new task list execution
// and recursively run itself infinite times
function runTask(task) {
  remove(task)
  task()
}

// this runs the passed function and delays all re-renders
// until the function is finished running
export function batch(fn, ctx, args) {
  try {
    batchCount++
    return fn.apply(ctx, args)
  } finally {
    if (batchCount === 1) {
      tasks.forEach(runTask)
    }
    // decrease the batch count after the iteration batched
    // in case the iteration introduces another batch
    // to avoid the newly introduced batch being a top level one
    batchCount--
  }
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
