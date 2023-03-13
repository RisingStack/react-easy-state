import React, { Component, useState } from 'react';
import {
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react/pure';
// eslint-disable-next-line import/no-unresolved
import { view, store, batch } from '@risingstack/react-easy-state';
import { easyAct } from './testHelpers';

describe('edge cases', () => {
  afterEach(cleanup);

  test('view() should respect shouldComponentUpdate', () => {
    const person = store({ name: 'Bob' });
    const MyComp = view(
      class extends Component {
        shouldComponentUpdate() {
          return false;
        }

        render() {
          return <div>{person.name}</div>;
        }
      },
    );

    const { container } = render(<MyComp />);
    expect(container).toHaveTextContent('Bob');
    easyAct(() => {
      person.name = 'Ann';
    });
    expect(container).toHaveTextContent('Bob');
  });

  test('view() should respect componentWillUnmount', () => {
    let didUnMount = false;

    const MyComp = view(
      class extends Component {
        componentWillUnmount() {
          didUnMount = true;
        }

        render() {
          return <div>Hello</div>;
        }
      },
    );

    const { unmount } = render(<MyComp />);
    expect(didUnMount).toBe(false);
    unmount();
    expect(didUnMount).toBe(true);
  });

  test('should not change vanilla setState behavior', () => {
    const MyComp = view(
      class extends Component {
        state = { counter: 0 };

        handleIncrement = () => {
          this.setState(prevState => ({
            counter: prevState.counter + 1,
          }));
        };

        render() {
          return (
            <button type="button" onClick={this.handleIncrement}>
              {this.state.counter}
            </button>
          );
        }
      },
    );

    const { container } = render(<MyComp />);
    expect(container).toHaveTextContent('0');
    fireEvent.click(container.querySelector('button'));
    expect(container).toHaveTextContent('1');
  });

  test("should not render when state or props don't change", () => {
    const MyComp = view(
      class extends Component {
        state = { counter: 0 };

        handleIncrement = () => {
          this.setState(prevState => ({
            counter: prevState.counter + 1,
          }));
        };

        render() {
          return (
            <div>
              <Child />
              <button onClick={this.handleIncrement} type="button">
                Increment
              </button>
            </div>
          );
        }
      },
    );

    const RawChild = jest.fn().mockReturnValue(<p>Test</p>);
    const Child = view(RawChild);

    const { container } = render(<MyComp />);
    expect(RawChild.mock.calls.length).toBe(1);
    fireEvent.click(container.querySelector('button'));
    expect(RawChild.mock.calls.length).toBe(1);
  });

  test('view() should respect custom deriveStoresFromProps', () => {
    const MyComp = view(
      class extends Component {
        // eslint-disable-next-line react/sort-comp
        store1 = store({ num: 0 });

        store2 = store({ num: 1 });

        static deriveStoresFromProps(props, store1, store2) {
          store1.num = props.num1 || store1.num;
          store2.num = props.num2 || store2.num;
        }

        handleOnClick = () => {
          this.store1.num += 1;
        };

        render() {
          return (
            <button type="button" onClick={this.handleOnClick}>
              {this.store1.num}
              {this.store2.num}
            </button>
          );
        }
      },
    );

    const { container } = render(<MyComp num1={1} />);
    expect(container).toHaveTextContent('11');
    fireEvent.click(container.querySelector('button'));
    expect(container).toHaveTextContent('11');
  });

  test('view() should respect getDerivedStateFromProps', () => {
    const MyComp = view(
      class extends Component {
        state = { num: 2 };

        static getDerivedStateFromProps(props, state) {
          return {
            num: props.num || state.num,
          };
        }

        render() {
          return <div>{this.state.num}</div>;
        }
      },
    );

    const { container } = render(<MyComp num={2} />);
    expect(container).toHaveTextContent('2');
  });

  test('view() should work with other hooks', () => {
    const MyComp = view(() => {
      const [num, setNum] = useState(0);
      return (
        <button type="button" onClick={() => setNum(num + 1)}>
          {num}
        </button>
      );
    });

    const { container } = render(<MyComp />);
    expect(container).toHaveTextContent('0');
    fireEvent.click(container.querySelector('button'));
    expect(container).toHaveTextContent('1');
  });

  describe('reactive renders should run in parent - child order with no duplicate child runs from props', () => {
    test('should work with function components', () => {
      const appStore = store({ num: 1, nested: { num: 12 } });

      let parentCalls = 0;
      let childCalls = 0;

      const Child = view(function Child() {
        childCalls += 1;
        return <div>{`${appStore.nested.num}, ${appStore.num}`}</div>;
      });

      const Parent = view(function Parent() {
        parentCalls += 1;
        return appStore.nested ? <Child /> : null;
      });

      const { container } = render(<Parent />);
      expect(container).toHaveTextContent('12, 1');
      expect(parentCalls).toBe(1);
      expect(childCalls).toBe(1);
      easyAct(() =>
        batch(() => {
          // The order of these updates is significant here. The child update
          // is triggered first, but we must update the parent first so that
          // the child is not rendered once appStore.nested is undefined.
          appStore.num = 0;
          appStore.nested = undefined;
        }),
      );
      expect(container).toHaveTextContent('');
      expect(parentCalls).toBe(2);
      expect(childCalls).toBe(1);
    });

    test('should work with class components', () => {
      const appStore = store({ num: 1, nested: { num: 12 } });

      let parentCalls = 0;
      let childCalls = 0;

      const Child = view(
        class Child extends Component {
          render() {
            childCalls += 1;
            return (
              <div>{`${appStore.nested.num}, ${appStore.num}`}</div>
            );
          }
        },
      );

      const Parent = view(
        class Parent extends Component {
          render() {
            parentCalls += 1;
            return appStore.nested ? <Child /> : null;
          }
        },
      );

      const { container } = render(<Parent />);
      expect(container).toHaveTextContent('12, 1');
      expect(parentCalls).toBe(1);
      expect(childCalls).toBe(1);
      easyAct(() =>
        batch(() => {
          appStore.num = 0;
          appStore.nested = undefined;
        }),
      );
      expect(container).toHaveTextContent('');
      expect(parentCalls).toBe(2);
      expect(childCalls).toBe(1);
    });
  });
});
