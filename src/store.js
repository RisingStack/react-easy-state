import { useMemo } from 'react';
import { observable } from '@nx-js/observer-util';

import {
  isInsideFunctionComponent,
  isInsideClassComponentRender,
  isInsideFunctionComponentWithoutHooks,
} from './view';

export let isInsideStoreMethod = false;

function processMethods(obj) {
  Object.getOwnPropertyNames(obj).forEach(key => {
    const { value, set } = Object.getOwnPropertyDescriptor(obj, key);

    if (typeof value === 'function') {
      obj[key] = new Proxy(value, {
        apply(target, thisArg, args) {
          try {
            isInsideStoreMethod = true;
            return Reflect.apply(target, thisArg, args);
          } finally {
            isInsideStoreMethod = false;
          }
        },
      });
    } else if (set) {
      Object.defineProperty(obj, key, {
        set(newValue) {
          try {
            isInsideStoreMethod = true;
            return Reflect.apply(set, obj, [newValue]);
          } finally {
            isInsideStoreMethod = false;
          }
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
