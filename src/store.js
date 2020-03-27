import { useMemo } from 'react';
import { observable } from '@nx-js/observer-util';
import { batch } from './scheduler';

import {
  isInsideFunctionComponent,
  isInsideClassComponentRender,
  isInsideFunctionComponentWithoutHooks,
} from './view';

// bind the `this` and batch mutations in store methods
function processMethods(obj) {
  Object.getOwnPropertyNames(obj).forEach(key => {
    // do not try to bind getter/setter functions
    const { value, get, set } = Object.getOwnPropertyDescriptor(
      obj,
      key,
    );

    // do not try to bind data properties
    if (typeof value === 'function') {
      // use a Proxy instead of function wrapping to keep the function name
      obj[key] = new Proxy(value, {
        apply(target, thisArg, args) {
          return batch(target, obj, args);
        },
      });
    } else if (get || set) {
      Object.defineProperty(obj, key, {
        get() {
          return batch(get, obj);
        },
        set(newValue) {
          return batch(set, obj, [newValue]);
        },
      });
    }
  });
  return obj;
}

export function store(obj) {
  // do not create new versions of the store on every render
  // if it is a local store in a function component
  // create a memoized store at the first call instead
  if (isInsideFunctionComponent) {
    // useMemo is not a semantic guarantee
    // In the future, React may choose to “forget” some previously memoized values and recalculate them on next render
    // see this docs for more explanation: https://reactjs.org/docs/hooks-reference.html#usememo
    return useMemo(
      () =>
        processMethods(
          observable(typeof obj === 'function' ? obj() : obj),
        ),
      [],
    );
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
  return processMethods(
    observable(typeof obj === 'function' ? obj() : obj),
  );
}
