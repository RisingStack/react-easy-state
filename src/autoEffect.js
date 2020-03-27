import { useEffect } from 'react';
import { observe, unobserve } from '@nx-js/observer-util';
import { queue } from './queue';

import {
  isInsideFunctionComponent,
  isInsideClassComponentRender,
  isInsideFunctionComponentWithoutHooks,
} from './view';

export function autoEffect(fn, deps = []) {
  if (isInsideFunctionComponent) {
    return useEffect(() => {
      const observer = observe(fn, {
        scheduler: () => queue.add(observer),
      });
      return () => unobserve(observer);
    }, deps);
  }
  if (isInsideFunctionComponentWithoutHooks) {
    throw new Error(
      'You cannot use autoEffect inside a function component with a pre-hooks version of React. Please update your React version to at least v16.8.0 to use this feature.',
    );
  }
  if (isInsideClassComponentRender) {
    throw new Error(
      'You cannot use autoEffect inside a render of a class component. Please use it in the constructor or lifecycle methods instead.',
    );
  }

  const observer = observe(fn, {
    scheduler: () => queue.add(observer),
  });
  return observer;
}

export { unobserve as clearEffect };
