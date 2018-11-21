import React from 'react'
import { render, cleanup } from 'react-testing-library'
import sinon from 'sinon'
import App from '../examples/clock/src/App'

describe('Clock App', () => {
  const clock = sinon.useFakeTimers()
  const { container } = render(<App />)
  const clearIntervalSpy = sinon.spy(global, 'clearInterval')

  afterAll(() => {
    clock.restore()
    clearIntervalSpy.restore()
  })

  test('should update to display the current time every second', async () => {
    expect(container).toHaveTextContent('12:00:00 AM')

    clock.tick(2000)
    expect(container).toHaveTextContent('12:00:02 AM')

    clock.tick(8500)
    expect(container).toHaveTextContent('12:00:10 AM')
  })

  test('should clean up the interval timer when the component is unmounted', () => {
    cleanup()
    expect(clearIntervalSpy.callCount).toBe(1)
  })
})
