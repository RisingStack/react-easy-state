import React, { StrictMode } from 'react'
import { render, flushMicrotasksQueue } from 'react-native-testing-library'
import sinon from 'sinon'
import App from '../examples/native-clock/App'

describe('Clock App', () => {
  const clock = sinon.useFakeTimers()
  const { getByText, unmount } = render(
    <StrictMode>
      <App />
    </StrictMode>
  )
  // flush the inital didMount effect
  flushMicrotasksQueue()

  const clearIntervalSpy = sinon.spy(global, 'clearInterval')

  afterAll(() => {
    clock.restore()
    clearIntervalSpy.restore()
  })

  test('should update to display the current time every second', () => {
    expect(getByText('12:00:00 AM')).toBeDefined()

    clock.tick(2000)
    expect(getByText('12:00:02 AM')).toBeDefined()

    clock.tick(8500)
    expect(getByText('12:00:10 AM')).toBeDefined()
  })

  test('should clean up the interval timer when the component is unmounted', () => {
    unmount()
    expect(clearIntervalSpy.callCount).toBe(1)
  })
})
