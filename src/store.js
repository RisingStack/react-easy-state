import { useMemo } from 'react';
import { observable } from '@frontity/observer-util';

import { batchMethods } from './batch';
import {
  isInsideFunctionComponent,
  isInsideClassComponentRender,
  isInsideFunctionComponentWithoutHooks,
} from './view';

function createStore(obj, options) {
  return batchMethods(observable(obj, options));
}

export function store(obj, options) {
  // do not create new versions of the store on every render
  // if it is a local store in a function component
  // create a memoized store at the first call instead
  if (isInsideFunctionComponent) {
    // useMemo is not a semantic guarantee
    // In the future, React may choose to “forget” some previously memoized values and recalculate them on next render
    // see this docs for more explanation: https://reactjs.org/docs/hooks-reference.html#usememo
    return useMemo(() => createStore(obj, options), []);
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
  return createStore(obj, options);
}
