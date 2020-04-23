import { useMemo } from 'react';
import { observable } from '@nx-js/observer-util';

import { batch } from './scheduler';
import {
  isInsideFunctionComponent,
  isInsideClassComponentRender,
  isInsideFunctionComponentWithoutHooks,
} from './view';

function batchMethods(obj) {
  Object.getOwnPropertyNames(obj).forEach(key => {
    const { value, set } = Object.getOwnPropertyDescriptor(obj, key);

    // batch store methods
    if (typeof value === 'function') {
      // use a Proxy instead of function wrapper to keep the method name
      obj[key] = new Proxy(value, {
        apply(target, thisArg, args) {
          return batch(target, thisArg, args);
        },
      });
    } else if (set) {
      // batch property setters
      Object.defineProperty(obj, key, {
        set(newValue) {
          return batch(set, obj, [newValue]);
        },
      });
    }
  });
  return obj;
}

function createStore(obj) {
  return batchMethods(
    observable(typeof obj === 'function' ? obj() : obj),
  );
}

export function store(obj) {
  // do not create new versions of the store on every render
  // if it is a local store in a function component
  // create a memoized store at the first call instead
  if (isInsideFunctionComponent) {
    // useMemo is not a semantic guarantee
    // In the future, React may choose to “forget” some previously memoized values and recalculate them on next render
    // see this docs for more explanation: https://reactjs.org/docs/hooks-reference.html#usememo
    return useMemo(() => createStore(obj), []);
  }
  if (isInsideFunctionComponentWithoutHooks) {
    throw new Error(
      'You cannot use state inside a function component with a pre-hooks version of React. Please update your React version to at least v16.8.0 to use this feature.',
    );
  }
  if (isInsideClassComponentRender) {
    throw new Error(
      'You cannot use state inside a render of a class component. Please create your store outside of the render function.',
    );
  }
  return createStore(obj);
}
