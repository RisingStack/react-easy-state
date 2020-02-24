import React from 'react';
import { render } from '@testing-library/react/pure';
// eslint-disable-next-line import/no-unresolved
import { view, store } from 'react-easy-state';

describe('Using an old react version', () => {
  test('Using local state in a function component with a version of react that has no hooks should throw an error', () => {
    const MyComp = view(() => {
      const person = store({ name: 'Bob' });
      return <div>{person.name}</div>;
    });

    expect(() => render(<MyComp />)).toThrow(
      'You cannot use state inside a function component with a pre-hooks version of React. Please update your React version to at least v16.8.0 to use this feature.',
    );
  });
});
