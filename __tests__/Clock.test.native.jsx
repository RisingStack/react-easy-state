import React, { StrictMode } from 'react';

import renderer from 'react-test-renderer';

import sinon from 'sinon';
import App from '../examples/native-clock/App';

describe('Clock App', () => {
  const clock = sinon.useFakeTimers();

  const app = renderer.create(
    <StrictMode>
      <App />
    </StrictMode>,
  );

  const { unmount } = app;

  const clearIntervalSpy = sinon.spy(global, 'clearInterval');

  afterAll(() => {
    clock.restore();
    clearIntervalSpy.restore();
  });

  test('should update to display the current time every second', async () => {
    const textElement = app.root.findByType('Text');

    expect(textElement.children[0]).toEqual('12:00:00 AM');

    clock.tick(2000);
    expect(textElement.children[0]).toEqual('12:00:02 AM');

    clock.tick(8500);
    expect(textElement.children[0]).toEqual('12:00:10 AM');
  });

  test('should clean up the interval timer when the component is unmounted', () => {
    unmount();
    expect(clearIntervalSpy.callCount).toBe(1);
  });
});
