import React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import sinon from 'sinon'
import App from '../examples/clock/App'

describe('Clock App', () => {
  const clock = sinon.useFakeTimers(0)
  const app = mount(<App />)
  const clearIntervalSpy = sinon.spy(global, 'clearInterval')

  afterAll(() => {
    clock.restore()
    clearIntervalSpy.restore()
  })

  test('should update to display the current time every second', async () => {
    expect(toJSON(app)).toMatchSnapshot('01. Initial state')

    clock.tick(2000)
    await Promise.resolve()
    expect(toJSON(app)).toMatchSnapshot('02. After 2 seconds')

    clock.tick(8500)
    await Promise.resolve()
    expect(toJSON(app)).toMatchSnapshot('03. After 10.5 seconds')
  })

  test('should clean up the interval timer when the component is unmounted', () => {
    app.unmount()
    expect(clearIntervalSpy.callCount).toBe(1)
  })
})
