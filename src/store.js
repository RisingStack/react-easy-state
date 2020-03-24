import { useRef } from 'react';
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
    // we have to use useRef instead of useMemo for local store persistence
    // useMemo does not have the same guarantees about persistence as refs
    // see this docs for more explanation: https://reactjs.org/docs/hooks-reference.html#usememo
    const ref = useRef(obj);
    // observable wrapping is idempotent
    // wrapping the same object multiple times is the same as wrapping it once
    return observable(ref.current);
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
