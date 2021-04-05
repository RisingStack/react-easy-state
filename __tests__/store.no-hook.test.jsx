import React, { Component } from 'react';
import { render, cleanup } from '@testing-library/react/pure';
// eslint-disable-next-line import/no-unresolved
import { view, store } from '@frontity/react-easy-state';

describe('Store edge cases and errors', () => {
  afterEach(cleanup);

  test(`Using local state in a function component ${
    process.env.NOHOOK
      ? 'with a version of react that has no hooks should'
      : 'should not'
  } throw an error`, () => {
    const MyComp = view(() => {
      const person = store({ name: 'Bob' });
      return <div>{person.name}</div>;
    });

    if (process.env.NOHOOK) {
      expect(() => render(<MyComp />)).toThrow(
        'You cannot use state inside a function component with a pre-hooks version of React. Please update your React version to at least v16.8.0 to use this feature.',
      );
    } else {
      expect(() => render(<MyComp />)).not.toThrow();
    }
  });

  test('Using global state in a function component should not throw an error', () => {
    const person = store({ name: 'Bob' });
    const MyComp = view(() => {
      return <div>{person.name}</div>;
    });
    expect(() => render(<MyComp />)).not.toThrow();
  });

  test('Using global state in a class component should not throw an error', () => {
    const person = store({ name: 'Bob' });
    const MyComp = view(
      class extends Component {
        render() {
          return <div>{person.name}</div>;
        }
      },
    );
    expect(() => render(<MyComp />)).not.toThrow();
  });

  test('Using local state in a class component should not throw an error', () => {
    const MyComp = view(
      class extends Component {
        person = store({ name: 'Bob' });

        render() {
          return <div>{this.person.name}</div>;
        }
      },
    );

    expect(() => render(<MyComp />)).not.toThrow();
  });

  test('Using local state inside a render of a class component should throw an error', () => {
    const MyComp = view(
      class extends Component {
        render() {
          const person = store({ name: 'Bob' });
          return <div>{person.name}</div>;
        }
      },
    );

    expect(() => render(<MyComp />)).toThrow(
      'You cannot use state inside a render of a class component. Please create your store outside of the render function.',
    );
  });
});
