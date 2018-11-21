import React, { Component } from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import { view, store } from 'react-easy-state'

describe('edge cases', () => {
  afterEach(cleanup)

  test('view() should respect shouldComponentUpdate', () => {
    const person = store({ name: 'Bob' })
    const MyComp = view(
      class extends Component {
        shouldComponentUpdate() {
          return false
        }
        render() {
          return <div>{person.name}</div>
        }
      }
    )

    const { container } = render(<MyComp />)
    expect(container).toHaveTextContent('Bob')
    person.name = 'Ann'
    expect(container).toHaveTextContent('Bob')
  })

  test('view() should respect componentWillUnmount', () => {
    let didUnMount = false

    const MyComp = view(
      class extends Component {
        componentWillUnmount() {
          didUnMount = true
        }
        render() {
          return <div>Hello</div>
        }
      }
    )

    const { container, unmount } = render(<MyComp />)
    expect(didUnMount).toBe(false)
    unmount()
    expect(didUnMount).toBe(true)
  })

  test('should not change vanilla setState behavior', () => {
    const MyComp = view(
      class extends Component {
        state = { counter: 0 }
        increment = () => this.setState({ counter: this.state.counter + 1 })

        render() {
          return <div onClick={this.increment}>{this.state.counter}</div>
        }
      }
    )

    const { container } = render(<MyComp />)
    expect(container).toHaveTextContent('0')
    fireEvent.click(container.querySelector('div'))
    expect(container).toHaveTextContent('1')
  })

  test("should not render when state or props don't change", () => {
    const MyComp = view(
      class extends Component {
        state = { counter: 0 }
        increment = () => this.setState({ counter: this.state.counter + 1 })

        render() {
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

    const { container } = render(<MyComp />)
    expect(RawChild.mock.calls.length).toBe(1)
    fireEvent.click(container.querySelector('button'))
    expect(RawChild.mock.calls.length).toBe(1)
  })

  test('view() should respect custom deriveStoresFromProps', () => {
    const MyComp = view(
      class extends Component {
        store1 = store({ num: 0 })
        store2 = store({ num: 1 })

        static deriveStoresFromProps(props, store1, store2) {
          store1.num = props.num1 || store1.num
          store2.num = props.num2 || store2.num
        }
        onClick = () => this.store1.num++

        render() {
          return (
            <div onClick={this.onClick}>
              {this.store1.num}
              {this.store2.num}
            </div>
          )
        }
      }
    )

    const { container } = render(<MyComp num1={1} />)
    expect(container).toHaveTextContent('11')
    fireEvent.click(container.querySelector('div'))
    expect(container).toHaveTextContent('11')
  })

  test('view() should respect getDerivedStateFromProps', () => {
    const MyComp = view(
      class extends Component {
        state = { num: 2 }
        static getDerivedStateFromProps(props, state) {
          return {
            num: props.num || state.num
          }
        }
        render() {
          return <div>{this.state.num}</div>
        }
      }
    )

    const { container } = render(<MyComp num={2} />)
    expect(container).toHaveTextContent('2')
  })
})
