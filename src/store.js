import { useMemo } from 'react';
import { observable } from '@nx-js/observer-util';

import {
  isInsideFunctionComponent,
  isInsideClassComponent,
} from './view';
import { hasHooks } from './utils';

export function store(obj) {
  // do not create new versions of the store on every render
  // if it is a local store in a function component
  // create a memoized store at the first call instead
  if (isInsideFunctionComponent) {
    return useMemo(() => observable(obj), []);
  }
  if (!hasHooks && isInsideClassComponent) {
    throw new Error(
      'You cannot use state inside a function component with a pre-hooks version of React. Please update your React version to at least v16.8.0 to use this feature.',
    );
  }
  return observable(obj);
}
