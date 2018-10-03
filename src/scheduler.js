const tasks = new Set()
let isStopped = false

export function add (task) {
  if (isStopped) {
    tasks.add(task)
  } else {
    runTask(task)
  }
}

export function remove (task) {
  tasks.delete(task)
}

// this replaces the passed function with a function
// that batches all of its callback arguments
function batch (fn) {
  return function batchingCallbacks (...args) {
    const batchedArgs = args.map(
      arg =>
        typeof arg === 'function'
          ? function batchedCallback () {
            try {
              isStopped = true
              return arg.apply(this, arguments)
            } finally {
              tasks.forEach(runTask)
              tasks.clear()
              isStopped = false
            }
          }
          : arg
    )
    return fn.apply(this, batchedArgs)
  }
}

function runTask (task) {
  task()
}

// do a sync batching for the most common task sources
// this should be removed when React's own batching is improved in the future
window.setTimeout = batch(window.setTimeout)
window.setInterval = batch(window.setInterval)
// eslint-disable-next-line
Promise.prototype.then = batch(Promise.prototype.then);
// eslint-disable-next-line
Promise.prototype.catch = batch(Promise.prototype.catch);

// DOM event handlers and HTTP event handlers don't have to be batched
// event handlers are batched by React
// HTTP event handlers are usually wrapped by Promises, which is covered above
