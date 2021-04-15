import React, { forwardRef, useRef } from 'react';
import { render, cleanup } from '@testing-library/react/pure';
// eslint-disable-next-line import/no-unresolved
import { view, store } from '@frontity/react-easy-state';
import { act } from 'react-dom/test-utils';

describe('forwardRef', () => {
  afterEach(cleanup);

  describe('function components', () => {
    test('should forward ref', () => {
      let usedRef;
      const counter = store({ num: 0 });

      const CompInnerForward = forwardRef((props, ref) => {
        return (
          <div ref={ref} {...props}>
            {counter.num}
          </div>
        );
      });

      const MyOtherComp = view(CompInnerForward);

      const App = () => {
        const refone = useRef();
        usedRef = refone;

        return <MyOtherComp ref={refone} />;
      };

      act(() => {
        render(<App />);
      });

      expect(usedRef.current).toMatchInlineSnapshot(`
        <div>
          0
        </div>
      `);
    });
  });
});
