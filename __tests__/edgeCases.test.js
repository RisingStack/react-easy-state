import React, { Component } from 'react'
import { view, store } from 'react-easy-state'
import { mount } from 'enzyme'

describe('edge cases', () => {
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

  test('should not change vanilla setState behavior', () => {
    const MyComp = view(
      class extends Component {
        state = { counter: 0 };
        increment = () => this.setState({ counter: this.state.counter + 1 });

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
        state = { counter: 0 };
        increment = () => this.setState({ counter: this.state.counter + 1 });

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

  test('view() should respect custom deriveStoresFromProps', () => {
    const MyComp = view(
      class extends Component {
        store1 = store({ num: 0 });
        store2 = store({ num: 1 });

        static deriveStoresFromProps (props, store1, store2) {
          store1.num = props.num1 || store1.num
          store2.num = props.num2 || store2.num
        }
        onClick = () => this.store1.num++;

        render () {
          return (
            <div onClick={this.onClick}>
              {this.store1.num}
              {this.store2.num}
            </div>
          )
        }
      }
    )

    const comp = mount(<MyComp num1={1} />)
    expect(comp.text()).toBe('11')
    comp.find('div').simulate('click')
    expect(comp.text()).toBe('21')
    comp.setProps({ num2: 4, num1: undefined })
    expect(comp.text()).toBe('24')
    comp.find('div').simulate('click')
    expect(comp.text()).toBe('34')
  })

  test('view() should respect getDerivedStateFromProps', () => {
    const MyComp = view(
      class extends Component {
        state = { num: 2 };
        static getDerivedStateFromProps (props, state) {
          return {
            num: props.num || state.num
          }
        }
        render () {
          return <div>{this.state.num}</div>
        }
      }
    )

    const comp = mount(<MyComp num={2} />)
    expect(comp.text()).toBe('2')
  })
})
