import React from 'react';
import { render, cleanup } from '@testing-library/react/pure';
import {
  view,
  store,
  autoEffect,
  clearEffect,
  // eslint-disable-next-line import/no-unresolved
} from '@frontity/react-easy-state';

describe('autoEffect', () => {
  afterEach(cleanup);

  test('should auto run global effects', () => {
    let documentTitle = '';
    const app = store({ name: 'Online Store' });

    const effect = autoEffect(() => {
      documentTitle = app.name;
    });
    expect(documentTitle).toBe('Online Store');

    app.name = 'Learning Platform';
    expect(documentTitle).toBe('Learning Platform');

    clearEffect(effect);
    app.name = 'Social Platform';
    expect(documentTitle).toBe('Learning Platform');
  });

  test('should auto run local effects in function components', () => {
    let documentTitle = '';

    const app = store({ name: 'Online Store' });

    const MyComp = view(() => {
      autoEffect(() => {
        documentTitle = app.name;
      });
      return <div>{app.name}</div>;
    });

    const { container, unmount } = render(<MyComp />);
    expect(container).toHaveTextContent('Online Store');
    expect(documentTitle).toBe('Online Store');

    app.name = 'Learning Platform';
    expect(container).toHaveTextContent('Learning Platform');
    expect(documentTitle).toBe('Learning Platform');

    unmount();
    app.name = 'Social Platform';
    expect(documentTitle).toBe('Learning Platform');
  });

  test('should be recreated on dependency changes in function components', () => {
    let documentTitle = '';

    const app = store({ name: 'Store' });

    const MyComp = view(({ name }) => {
      autoEffect(() => {
        documentTitle = `${name} ${app.name}`;
      }, [name]);
      return (
        <div>
          {name} {app.name}
        </div>
      );
    });

    const { container, rerender } = render(<MyComp name="Online" />);
    expect(container).toHaveTextContent('Online Store');
    expect(documentTitle).toBe('Online Store');

    rerender(<MyComp name="Awesome" />);
    expect(container).toHaveTextContent('Awesome Store');
    expect(documentTitle).toBe('Awesome Store');

    app.name = 'Page';
    expect(container).toHaveTextContent('Awesome Page');
    expect(documentTitle).toBe('Awesome Page');
  });
});
