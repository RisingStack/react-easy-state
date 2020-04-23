import React, { StrictMode } from 'react';
import { render, cleanup } from '@testing-library/react/pure';
import sinon from 'sinon';
import App from '../examples/clock/src/App';

describe('Clock App', () => {
  const clock = sinon.useFakeTimers();
  const { container, unmount } = render(
    <StrictMode>
      <App />
    </StrictMode>,
  );

  const clearIntervalSpy = sinon.spy(global, 'clearInterval');
  /*
    Please keep the cleanup in a separate afterAll.
    Otherwise, it will lose the scope of the document, and it won't be able to clear the body.
  */
  afterAll(cleanup);
  afterAll(() => {
    clock.restore();
    clearIntervalSpy.restore();
  });

  test('should update to display the current time every second', () => {
    expect(container).toHaveTextContent('12:00:00 AM');

    clock.tick(2000);
    expect(container).toHaveTextContent('12:00:02 AM');

    clock.tick(8500);
    expect(container).toHaveTextContent('12:00:10 AM');
  });

  test('should clean up the interval timer when the component is unmounted', () => {
    unmount();
    expect(clearIntervalSpy.callCount).toBe(1);
  });
});
