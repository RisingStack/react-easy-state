import React, { Component } from 'react';
import { render, cleanup } from '@testing-library/react/pure';
import {
  view,
  store,
  autoEffect,
  // eslint-disable-next-line import/no-unresolved
} from '@frontity/react-easy-state';

describe('AutoEffect edge cases and errors', () => {
  afterEach(cleanup);

  test(`Using autoEffect in a function component ${
    process.env.NOHOOK
      ? 'with a version of react that has no hooks should'
      : 'should not'
  } throw an error`, () => {
    const someEffect = () => {};
    const person = store({ name: 'Bob' });

    const MyComp = view(() => {
      autoEffect(() => someEffect(person.name));
      return <div>{person.name}</div>;
    });

    if (process.env.NOHOOK) {
      expect(() => render(<MyComp />)).toThrow(
        'You cannot use autoEffect inside a function component with a pre-hooks version of React. Please update your React version to at least v16.8.0 to use this feature.',
      );
    } else {
      expect(() => render(<MyComp />)).not.toThrow();
    }
  });

  test('Using autoEffect inside a render of a class component should throw an error', () => {
    const someEffect = () => {};
    const person = store({ name: 'Bob' });

    const MyComp = view(
      class extends Component {
        render() {
          autoEffect(() => someEffect(person.name));
          return <div>{person.name}</div>;
        }
      },
    );

    expect(() => render(<MyComp />)).toThrow(
      'You cannot use autoEffect inside a render of a class component. Please use it in the constructor or lifecycle methods instead.',
    );
  });
});
