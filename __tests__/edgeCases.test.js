import React, { Component, PureComponent } from 'react'
import { view, store } from 'react-easy-state'
import { mount } from 'enzyme'

describe('errors', () => {
  test('view() should throw on non component or function arguments', () => {
    class Comp extends Component {}
    class PureComp extends PureComponent {}
    function FuncComp () {}

    expect(() => view()).toThrow()
    expect(() => view(12)).toThrow()
    expect(() => view(Comp)).not.toThrow()
    expect(() => view(PureComp)).not.toThrow()
    expect(() => view(FuncComp)).not.toThrow()
  })

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
})
