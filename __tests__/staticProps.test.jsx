/* eslint-disable react/forbid-foreign-prop-types */
/* eslint-disable no-multi-assign */
import React, { Component } from 'react';
import { render, cleanup } from '@testing-library/react/pure';
// eslint-disable-next-line import/no-unresolved
import { view } from '@risingstack/react-easy-state';
import PropTypes from 'prop-types';

describe('static props', () => {
  afterEach(cleanup);

  test('view() should proxy defaultProps for class components', () => {
    class MyCustomCompName extends Component {
      render() {
        return <div>{this.props.name}</div>;
      }
    }

    MyCustomCompName.defaultProps = {
      name: 'Bob',
    };

    const WrappedComp = view(MyCustomCompName);
    const { container } = render(<WrappedComp />);
    expect(container).toHaveTextContent('Bob');
  });

  test('view() should proxy defaultProps for functional components', () => {
    const MyCustomCompName = (props) => {
      return <div>{props.name}</div>;
    };

    MyCustomCompName.defaultProps = {
      name: 'Bob',
    };

    const WrappedComp = view(MyCustomCompName);
    const { container } = render(<WrappedComp />);
    expect(container).toHaveTextContent('Bob');
  });

  test('view() should proxy propTypes for class components', () => {
    class MyCustomCompName extends Component {
      render() {
        return <div>{this.props.name}</div>;
      }
    }

    MyCustomCompName.propTypes = {
      name: PropTypes.string.isRequired,
    };

    const ViewComp = MyCustomCompName;

    const errorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation((warning, prop, error) => {
        expect(warning).toBe('Warning: Failed %s type: %s%s');
        expect(prop).toBe('prop');
        expect(error).toBe(
          'The prop `name` is marked as required in `MyCustomCompName`, but its value is `undefined`.',
        );
      });
    expect(1).toBe(1);
    render(<ViewComp number="Bob" />);
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  test('view() should proxy propTypes for functional components', () => {
    const MyCustomCompName = (props) => {
      return <div>{props.number}</div>;
    };

    MyCustomCompName.propTypes = {
      number: PropTypes.number.isRequired,
    };

    const ViewComp = view(MyCustomCompName);

    const errorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation((warning, prop, error) => {
        expect(warning).toBe('Warning: Failed %s type: %s%s');
        expect(prop).toBe('prop');
        expect(error).toBe(
          'Invalid prop `number` of type `string` supplied to `MyCustomCompName`, expected `number`.',
        );
      });
    render(<ViewComp number="Bob" />);
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  test('view() should proxy static methods', () => {
    class Comp extends Component {
      static getDerivedStateFromError() {}

      static customMethod() {}
    }

    const ViewComp = view(Comp);
    expect(ViewComp.getDerivedStateFromError).toBe(
      Comp.getDerivedStateFromError,
    );
    expect(ViewComp.customMethod).toBe(Comp.customMethod);
  });

  test('view() should proxy static getters', () => {
    class Comp extends Component {
      static get defaultProp() {
        return { key: 'value' };
      }

      static get customProp() {
        return { key: 'hello' };
      }
    }

    const ViewComp = view(Comp);
    expect(ViewComp.defaultProps).toEqual(Comp.defaultProps);
    expect(ViewComp.customProp).toEqual(Comp.customProp);
  });
});
