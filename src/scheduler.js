/* eslint camelcase: 0 */

import { globalObj } from './utils';
import { queue } from './queue';

// this runs the passed function and delays all re-renders
// until the function is finished running
export function batch(fn, ctx, args) {
  if (queue.isInsideBatch) {
    return fn.apply(ctx, args);
  }
  try {
    queue.on();
    return fn.apply(ctx, args);
  } finally {
    queue.flush();
    queue.off();
  }
}

// this creates and returns a batched version of the passed function
// the cache is necessary to always map the same thing to the same function
// which makes sure that addEventListener/removeEventListener pairs don't break
const cache = new WeakMap();
function batchFn(fn) {
  if (typeof fn !== 'function') {
    return fn;
  }
  let batched = cache.get(fn);
  if (!batched) {
    batched = function(...args) {
      return batch(fn, this, args);
    };
    cache.set(fn, batched);
  }
  return batched;
}

function batchMethodCallbacks(obj, method) {
  const descriptor = Object.getOwnPropertyDescriptor(obj, method);
  if (
    descriptor &&
    descriptor.writable &&
    typeof descriptor.value === 'function'
  ) {
    obj[method] = new Proxy(descriptor.value, {
      apply(target, ctx, args) {
        return Reflect.apply(target, ctx, args.map(batchFn));
      },
    });
  }
}

// batched obj.addEventListener(cb) like callbacks
function batchMethodsCallbacks(obj, methods) {
  methods.forEach(method => batchMethodCallbacks(obj, method));
}

function batchMethod(obj, method) {
  const descriptor = Object.getOwnPropertyDescriptor(obj, method);
  if (descriptor && descriptor.configurable) {
    const newDescriptor = {
      ...descriptor,
      set(value) {
        return descriptor.set.call(this, batchFn(value));
      },
    };
    Object.defineProperty(obj, method, newDescriptor);
  }
}

// batches obj.onevent = fn like calls
function batchMethods(obj, methods) {
  methods.forEach(method => batchMethod(obj, method));
}

// do a sync batching for the most common task sources
// this should be removed when React's own batching is improved in the future

// batch timer functions
batchMethodsCallbacks(globalObj, [
  'setTimeout',
  'setInterval',
  'requestAnimationFrame',
  'requestIdleCallback',
]);

if (globalObj.Promise) {
  batchMethodsCallbacks(Promise.prototype, ['then', 'catch']);
}

// Event listener batching causes an input caret jumping bug:
// https://github.com/RisingStack/react-easy-state/issues/92.
// This part has to be commented out to prevent that bug.
// React batches setStates in its event listeners anyways
// so this commenting this part out is not a huge issue.

// batch addEventListener calls
/* if (globalObj.EventTarget) {
  batchMethodsCallbacks(EventTarget.prototype, [
    'addEventListener',
    'removeEventListener',
  ]);
} */

// this batches websocket event handlers
if (globalObj.WebSocket) {
  batchMethods(WebSocket.prototype, [
    'onopen',
    'onmessage',
    'onerror',
    'onclose',
  ]);
}

// HTTP event handlers are usually wrapped by Promises, which is covered above
