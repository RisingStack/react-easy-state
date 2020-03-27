import React, { Component } from 'react';
import { render, cleanup, act } from '@testing-library/react/pure';
import {
  view,
  store,
  autoEffect,
  clearEffect,
  batch,
  // eslint-disable-next-line import/no-unresolved
} from 'react-easy-state';

describe('batching', () => {
  afterEach(cleanup);

  test('should batch state changes inside a batch() wrapper for views', () => {
    let renderCount = 0;
    const person = store({ name: 'Bob' });
    const MyComp = view(() => {
      renderCount += 1;
      return <div>{person.name}</div>;
    });

    const { container } = render(<MyComp />);
    expect(renderCount).toBe(1);
    expect(container).toHaveTextContent('Bob');
    act(() =>
      batch(() => {
        person.name = 'Ann';
        person.name = 'Rick';
      }),
    );
    expect(container).toHaveTextContent('Rick');
    expect(renderCount).toBe(2);
  });

  test('should batch state changes inside a batch() wrapper for global autoEffects', () => {
    let numOfRuns = 0;
    let name = '';

    const person = store({ name: 'Bob' });
    const effect = autoEffect(() => {
      numOfRuns += 1;
      name = person.name;
    });

    expect(name).toBe('Bob');
    expect(numOfRuns).toBe(1);

    batch(() => {
      person.name = 'Ann';
      person.name = 'Rick';
    });

    expect(name).toBe('Rick');
    expect(numOfRuns).toBe(2);

    clearEffect(effect);
  });

  test('should batch state changes inside a batch() wrapper for local autoEffects', () => {
    let effectCount = 0;
    let renderCount = 0;
    let name = '';

    const person = store({ name: 'Bob' });
    const MyComp = view(() => {
      renderCount += 1;
      autoEffect(() => {
        effectCount += 1;
        name = person.name;
      });
      return <div>{person.name}</div>;
    });

    const { container } = render(<MyComp />);
    expect(container).toHaveTextContent('Bob');
    expect(name).toBe('Bob');
    expect(effectCount).toBe(1);
    expect(renderCount).toBe(1);

    batch(() => {
      person.name = 'Ann';
      person.name = 'Rick';
    });

    expect(name).toBe('Rick');
    expect(container).toHaveTextContent('Rick');
    expect(effectCount).toBe(2);
    expect(renderCount).toBe(2);
  });

  test('should batch state changes inside a batch() wrapper in a class component', () => {
    let renderCount = 0;
    const person = store({ name: 'Bob' });
    const MyComp = view(
      class extends Component {
        render() {
          renderCount += 1;
          return <div>{person.name}</div>;
        }
      },
    );

    const { container } = render(<MyComp />);
    expect(renderCount).toBe(1);
    expect(container).toHaveTextContent('Bob');
    batch(() => {
      person.name = 'Ann';
      person.name = 'Rick';
    });
    expect(container).toHaveTextContent('Rick');
    expect(renderCount).toBe(2);
  });

  test('should not batch state changes outside a batch() wrapper', () => {
    let renderCount = 0;
    const person = store({ name: 'Bob' });
    const MyComp = view(() => {
      renderCount += 1;
      return <div>{person.name}</div>;
    });

    const { container } = render(<MyComp />);
    expect(renderCount).toBe(1);
    expect(container).toHaveTextContent('Bob');
    act(() => {
      person.name = 'Ann';
    });
    act(() => {
      person.name = 'Rick';
    });
    expect(container).toHaveTextContent('Rick');
    expect(renderCount).toBe(3);
  });

  test('should work with nested batch() calls', () => {
    let renderCount = 0;
    const person = store({ name: 'Bob' });
    const MyComp = view(() => {
      renderCount += 1;
      return <div>{person.name}</div>;
    });

    const { container } = render(<MyComp />);
    expect(renderCount).toBe(1);
    expect(container).toHaveTextContent('Bob');
    act(() =>
      batch(() => {
        batch(() => {
          person.name = 'Rob';
          person.name = 'David';
        });
        expect(container).toHaveTextContent('Bob');
        person.name = 'Ann';
        person.name = 'Rick';
      }),
    );
    expect(container).toHaveTextContent('Rick');
    expect(renderCount).toBe(2);
  });

  test('should recover when error thrown inside batch', () => {
    let renderCount = 0;
    const person = store({ name: 'Bob' });
    const MyComp = view(() => {
      renderCount += 1;
      return <div>{person.name}</div>;
    });

    const { container } = render(<MyComp />);
    expect(renderCount).toBe(1);
    expect(container).toHaveTextContent('Bob');

    try {
      act(() =>
        batch(() => {
          person.name = 'Ann';
          person.name = 'Rick';
          throw new Error('Totally Expected Error');
        }),
      );
    } catch (e) {
      expect(e.message).toBe('Totally Expected Error');
    }

    expect(container).toHaveTextContent('Rick');
    expect(renderCount).toBe(2);
  });

  test('should batch state changes inside native event listeners', () => {
    let renderCount = 0;
    const person = store({ name: 'Bob' });
    const MyComp = view(() => {
      renderCount += 1;
      return <div>{person.name}</div>;
    });

    const { container } = render(<MyComp />);
    expect(renderCount).toBe(1);
    expect(container).toHaveTextContent('Bob');
    const batched = act(() => {
      person.name = 'Ann';
      person.name = 'Rick';
    });
    document.body.addEventListener('click', batched);
    document.body.dispatchEvent(new Event('click'));
    expect(container).toHaveTextContent('Rick');
    expect(renderCount).toBe(2);
    document.body.removeEventListener('click', batched);
  });

  // async/await is only batched when it is transpiled to promises and/or generators
  // by the time transpilation won't be necessary, the batching will change to use async React
  test('should batch changes in setTimeout and setInterval', async () => {
    let renderCount = 0;
    const person = store({ name: 'Bob' });
    const MyComp = view(() => {
      renderCount += 1;
      return <div>{person.name}</div>;
    });

    const { container } = render(<MyComp />);
    expect(renderCount).toBe(1);
    expect(container).toHaveTextContent('Bob');
    await act(
      () =>
        new Promise(
          resolve =>
            setTimeout(() => {
              person.name = 'Ann';
              person.name = 'Rick';
              resolve();
            }),
          100,
        ),
    );
    expect(container).toHaveTextContent('Rick');
    expect(renderCount).toBe(2);
  });

  test('should batch changes in requestAnimationFrame and requestIdleCallback', async () => {
    let renderCount = 0;
    const person = store({ name: 'Bob' });
    const MyComp = view(() => {
      renderCount += 1;
      return <div>{person.name}</div>;
    });

    const { container } = render(<MyComp />);
    expect(renderCount).toBe(1);
    expect(container).toHaveTextContent('Bob');
    await act(
      () =>
        new Promise(resolve =>
          // eslint-disable-next-line
          requestAnimationFrame(() => {
            person.name = 'Ann';
            person.name = 'Rick';
            resolve();
          }),
        ),
    );
    expect(container).toHaveTextContent('Rick');
    expect(renderCount).toBe(2);
  });

  test('should batch changes in Promise.then and Promise.catch', async () => {
    let renderCount = 0;
    const person = store({ name: 'Bob' });
    const MyComp = view(() => {
      renderCount += 1;
      return <div>{person.name}</div>;
    });

    const { container } = render(<MyComp />);
    expect(renderCount).toBe(1);
    expect(container).toHaveTextContent('Bob');
    await act(() =>
      Promise.resolve().then(() => {
        person.name = 'Ann';
        person.name = 'Rick';
      }),
    );
    expect(container).toHaveTextContent('Rick');
    expect(renderCount).toBe(2);

    await act(() =>
      Promise.reject(new Error()).catch(() => {
        person.name = 'Ben';
        person.name = 'Morty';
      }),
    );
    expect(container).toHaveTextContent('Morty');
    expect(renderCount).toBe(3);
  });

  test('should batch changes in async function parts', async () => {
    let renderCount = 0;
    const person = store({ name: 'Bob' });
    const MyComp = view(() => {
      renderCount += 1;
      return <div>{person.name}</div>;
    });

    const { container } = render(<MyComp />);
    expect(renderCount).toBe(1);
    expect(container).toHaveTextContent('Bob');
    await act(() => Promise.resolve());
    person.name = 'Ann';
    person.name = 'Rick';
    // ISSUE -> here it is not yet updated!!! -> the then block is not over I guess
    await act(() => Promise.resolve());
    expect(container).toHaveTextContent('Rick');
    expect(renderCount).toBe(2);
  });

  test('should not break Promises', async () => {
    await Promise.resolve(12)
      .then(value => {
        expect(value).toBe(12);
        // eslint-disable-next-line
        throw 15;
      })
      .catch(err => {
        expect(err).toBe(15);
      });
  });

  test('should not break setTimeout', async () => {
    await new Promise(resolve => {
      setTimeout(
        (arg1, arg2, arg3) => {
          expect(arg1).toBe('Hello');
          expect(arg2).toBe('World');
          expect(arg3).toBe(undefined);
          resolve();
        },
        100,
        'Hello',
        'World',
      );
    });
  });

  test('should not break event listeners', () => {
    let callCount = 0;
    const fn = () => {
      callCount += 1;
    };
    document.body.addEventListener('click', fn);

    expect(callCount).toBe(0);
    document.body.dispatchEvent(new Event('click'));
    expect(callCount).toBe(1);
    document.body.removeEventListener('click', fn);
    document.body.dispatchEvent(new Event('click'));
    expect(callCount).toBe(1);
  });

  test('should not break method this value and args', done => {
    const socket = new WebSocket('ws://www.example.com');

    socket.onclose = function(ev) {
      expect(ev).toBeDefined();
      expect(this).toBe(socket);
      done();
    };

    socket.close();
  });

  test('should not break callback this value and args', done => {
    const ctx = {};

    setTimeout(
      function(arg1, arg2) {
        expect(arg1).toBe('Test');
        expect(arg2).toBe('Test2');
        expect(this).toBe(ctx);
        done();
      }.bind(ctx),
      0,
      'Test',
      'Test2',
    );
  });

  test('should not break return value', () => {
    const result = batch(() => 12);
    expect(result).toBe(12);
  });
});
