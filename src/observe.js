import { observe } from '@nx-js/observer-util';
import { queue } from './queue';
import { isInsideStoreMethod } from './store';

const isDev = process.env.NODE_ENV !== 'production';
let isStrictMode = false;

export function configure({ strictMode = false } = {}) {
  isStrictMode = strictMode;
}

function enforceStrictMode(action) {
  if (isStrictMode && !isInsideStoreMethod && action.type === 'set') {
    throw new Error(
      'You can not set store properties outside store methods in strict mode',
    );
  }
}

export default function customObserve(fn, options) {
  const observer = observe(fn, {
    debugger: isDev ? enforceStrictMode : undefined,
    ...options,
  });
  return observer;
}
