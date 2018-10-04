const tasks = new Set()
let isStopped = false

export function add(task) {
  if (isStopped) {
    tasks.add(task)
  } else {
    runTask(task)
  }
}

export function remove(task) {
  tasks.delete(task)
}

// this replaces the passed function with a function
// that batches all of its callback arguments
function batchCallbacks(fn) {
  return function batchedCallbacks(...args) {
    const batchedArgs = args.map(
      arg => (typeof arg === 'function' ? (...args) => batch(arg, args) : arg)
    )
    return fn.apply(this, batchedArgs)
  }
}

// this runs the passed function and delays all re-renders
// until the function is finished running
export function batch(fn, args) {
  try {
    isStopped = true
    return fn.apply(this, args)
  } finally {
    tasks.forEach(runTask)
    tasks.clear()
    isStopped = false
  }
}

function runTask(task) {
  task()
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
}

// DOM event handlers and HTTP event handlers don't have to be batched
// event handlers are batched by React
// HTTP event handlers are usually wrapped by Promises, which is covered above
