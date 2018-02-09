import React, { Component, PureComponent } from 'react'
import { view, store } from 'react-easy-state'
import { mount } from 'enzyme'

describe('errors', () => {
  test('view() should respect shouldComponentUpdate', () => {
    const person = store({ name: 'Bob' })
    const MyComp = view(
      class extends Component {
        shouldComponentUpdate () {
          return false
        }
        render () {
          return <div>{person.name}</div>
        }
      }
    )

    const comp = mount(<MyComp />)
    expect(comp.text()).toBe('Bob')
    person.name = 'Ann'
    expect(comp.text()).toBe('Bob')
  })

  test('store() should throw on non object or undefined argument', () => {
    expect(() => store(null)).toThrow()
    expect(() => store({})).not.toThrow()
    expect(() => store()).not.toThrow()
  })

  test('should not change vanilla setState behavior', () => {
    const MyComp = view(
      class extends Component {
        state = { counter: 0 }
        increment = () => this.setState({ counter: this.state.counter + 1 })

        render () {
          return <div onClick={this.increment}>{this.state.counter}</div>
        }
      }
    )

    const comp = mount(<MyComp />)
    expect(comp.text()).toBe('0')
    comp.find('div').simulate('click')
    expect(comp.text()).toBe('1')
  })

  test('should not change vanilla setState behavior', () => {
    const MyComp = view(
      class extends Component {
        state = { counter: 0 }
        increment = () => this.setState({ counter: this.state.counter + 1 })

        render () {
          return <div onClick={this.increment}>{this.state.counter}</div>
        }
      }
    )

    const comp = mount(<MyComp />)
    expect(comp.text()).toBe('0')
    comp.find('div').simulate('click')
    expect(comp.text()).toBe('1')
  })

  test("should not render when state or props don't change", () => {
    const MyComp = view(
      class extends Component {
        state = { counter: 0 }
        increment = () => this.setState({ counter: this.state.counter + 1 })

        render () {
          return (
            <div>
              <Child />
              <button onClick={this.increment}>Increment</button>
            </div>
          )
        }
      }
    )

    const RawChild = jest.fn().mockReturnValue(<p>Test</p>)
    const Child = view(RawChild)

    const comp = mount(<MyComp />)
    expect(RawChild.mock.calls.length).toBe(1)
    comp.find('button').simulate('click')
    expect(RawChild.mock.calls.length).toBe(1)
  })
})
