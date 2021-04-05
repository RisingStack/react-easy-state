import { useEffect } from 'react';
import { observe, unobserve } from '@frontity/observer-util';
import scheduler from './scheduler';

import {
  isInsideFunctionComponent,
  isInsideClassComponentRender,
  isInsideFunctionComponentWithoutHooks,
} from './view';

export function autoEffect(fn, deps = []) {
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

  if (isInsideFunctionComponent) {
    return useEffect(() => {
      const reaction = observe(fn, {
        scheduler: scheduler.add,
      });
      return () => unobserve(reaction);
    }, deps);
  }

  return observe(fn, {
    scheduler: scheduler.add,
  });
}

export { unobserve as clearEffect };
