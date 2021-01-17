import '@babel/polyfill';
import '@testing-library/jest-dom/extend-expect';

window.easyFakeTimers = () => {
  jest.useFakeTimers();
  window.queueMicrotask = window.setTimeout;
};

window.easyRunTimers = () => {
  jest.runAllTimers();
};

// Wrap any action that might change state so that we can ensure all batched
// operations complete before we check them.
window.easyAct = fn => {
  easyFakeTimers();
  const result = fn();
  easyRunTimers();
  return result;
};
