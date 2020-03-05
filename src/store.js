import { useMemo } from 'react';
import { observable } from '@nx-js/observer-util';

import {
  isInsideFunctionComponent,
  isInsideClassComponentRender,
  isInsideFunctionComponentWithoutHooks,
} from './view';

export function store(obj) {
  // do not create new versions of the store on every render
  // if it is a local store in a function component
  // create a memoized store at the first call instead
  if (isInsideFunctionComponent) {
    return useMemo(() => observable(obj), []);
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
  return observable(obj);
}
