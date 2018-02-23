import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'
import App from '../examples/clock/src/App'

describe('Clock App', () => {
  const clock = sinon.useFakeTimers()
  const app = mount(<App />)
  const clearIntervalSpy = sinon.spy(global, 'clearInterval')

  afterAll(() => {
    clock.restore()
    clearIntervalSpy.restore()
  })

  test('should update to display the current time every second', async () => {
    expect(app.text()).toBe('12:00:00 AM')

    clock.tick(2000)
    expect(app.text()).toBe('12:00:02 AM')

    clock.tick(8500)
    expect(app.text()).toBe('12:00:10 AM')
  })

  test('should clean up the interval timer when the component is unmounted', () => {
    app.unmount()
    expect(clearIntervalSpy.callCount).toBe(1)
  })
})
