export function easyFakeTimers() {
  jest.useFakeTimers();
  if (typeof window !== 'undefined')
    window.queueMicrotask = window.setTimeout;
  if (typeof global !== 'undefined')
    global.queueMicrotask = global.setTimeout;
}

export function easyRunTimers() {
  jest.runAllTimers();
}

// Wrap any action that might change state so that we can ensure all batched
// operations complete before we check them.
export function easyAct(fn) {
  easyFakeTimers();
  const result = fn();
  easyRunTimers();
  return result;
}
