import React, { Component } from 'react';
import {
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react/pure';
// eslint-disable-next-line import/no-unresolved
import { view, store } from '@frontity/react-easy-state';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';

describe('withRouter interaction', () => {
  /*
    Please keep the cleanup in a separate afterEach.
    Otherwise, it will lose the scope of the document, and it won't be able to clear the body.
  */
  afterEach(cleanup);
  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  describe('function components', () => {
    test('should be reactive with withRouter(view(Comp))', () => {
      const counter = store({ num: 0 });
      const MyComp = withRouter(view(() => <div>{counter.num}</div>));

      const { container } = render(
        <Router>
          <MyComp />
        </Router>,
      );
      expect(container).toHaveTextContent('0');
      counter.num += 1;
      expect(container).toHaveTextContent('1');
    });

    test('should properly route with withRouter(view(Comp))', () => {
      const MyComp = withRouter(
        view(() => (
          <div>
            <Link to="/settings">To Settings</Link>
            <Route path="/settings" render={() => <p>Settings</p>} />
          </div>
        )),
      );

      const { container, getByText } = render(
        <Router>
          <MyComp />
        </Router>,
      );

      expect(container.querySelector('p')).toBe(null);
      fireEvent.click(getByText('To Settings'));
      expect(container.querySelector('p')).toHaveTextContent(
        'Settings',
      );
    });
  });

  describe('class components', () => {
    test('should be reactive with withRouter(view(Comp))', () => {
      const counter = store({ num: 0 });
      const MyComp = withRouter(
        view(
          class MyComp extends Component {
            render() {
              return <div>{counter.num}</div>;
            }
          },
        ),
      );

      const { container } = render(
        <Router>
          <MyComp />
        </Router>,
      );
      expect(container).toHaveTextContent('0');
      counter.num += 1;
      expect(container).toHaveTextContent('1');
    });

    test('should properly route with withRouter(view(Comp))', () => {
      const MyComp = withRouter(
        view(
          class MyComp extends Component {
            render() {
              return (
                <div>
                  <Link to="/settings">To Settings</Link>
                  <Route
                    path="/settings"
                    render={() => <p>Settings</p>}
                  />
                </div>
              );
            }
          },
        ),
      );

      const { container, getByText } = render(
        <Router>
          <MyComp />
        </Router>,
      );

      expect(container.querySelector('p')).toBe(null);
      fireEvent.click(getByText('To Settings'));
      expect(container.querySelector('p')).toHaveTextContent(
        'Settings',
      );
    });
  });
});
