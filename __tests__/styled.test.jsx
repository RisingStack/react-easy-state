import React, { Component } from 'react';
import { render, cleanup } from '@testing-library/react/pure';
// eslint-disable-next-line import/no-unresolved
import { view, store } from '@frontity/react-easy-state';
import { withTheme, ThemeProvider } from 'styled-components';

describe('withRouter interaction', () => {
  const theme = { color: 'red' };
  const Theme = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );

  afterEach(cleanup);

  describe('function components', () => {
    test('should be reactive with withTheme(view(Comp))', () => {
      const counter = store({ num: 0 });
      const MyComp = withTheme(view(() => <div>{counter.num}</div>));

      const { container } = render(
        <Theme>
          <MyComp />
        </Theme>,
      );
      expect(container).toHaveTextContent('0');
      counter.num += 1;
      expect(container).toHaveTextContent('1');
    });

    test('should properly inject theme with withTheme(view(Comp))', () => {
      const MyComp = withTheme(
        view(({ theme: hocTheme }) => (
          <p style={{ color: hocTheme.color }}>Hello</p>
        )),
      );

      const { container } = render(
        <Theme>
          <MyComp />
        </Theme>,
      );
      expect(container.querySelector('p')).toHaveStyle('color: red;');
    });
  });

  describe('class components', () => {
    test('should be reactive with withTheme(view(Comp))', () => {
      const counter = store({ num: 0 });
      const MyComp = withTheme(
        view(
          class MyComp extends Component {
            render() {
              return <div>{counter.num}</div>;
            }
          },
        ),
      );

      const { container } = render(
        <Theme>
          <MyComp />
        </Theme>,
      );
      expect(container).toHaveTextContent('0');
      counter.num += 1;
      expect(container).toHaveTextContent('1');
    });

    test('should properly route with withRouter(view(Comp))', () => {
      const MyComp = withTheme(
        view(
          class MyComp extends Component {
            render() {
              return <p style={{ color: theme.color }}>Hello</p>;
            }
          },
        ),
      );

      const { container } = render(
        <Theme>
          <MyComp />
        </Theme>,
      );
      expect(container.querySelector('p')).toHaveStyle('color: red;');
    });
  });
});
