import React, { Component, PureComponent } from 'react'
import { easyComp, easyStore } from 'react-easy-state'
import { mount } from 'enzyme'

describe('errors', () => {
  test('easyComp should throw on non component or function arguments', () => {
    class Comp extends Component {}
    class PureComp extends PureComponent {}
    function FuncComp () {}

    expect(() => easyComp()).toThrow()
    expect(() => easyComp(12)).toThrow()
    expect(() => easyComp(Comp)).not.toThrow()
    expect(() => easyComp(PureComp)).not.toThrow()
    expect(() => easyComp(FuncComp)).not.toThrow()
  })

  test('easyComp should throw when the store is not an object or undefined', () => {
    const UndefinedComp = easyComp(class extends Component {})
    const ObjectComp = easyComp(
      class extends Component {
        store = {};
      }
    )
    const NullComp = easyComp(
      class extends Component {
        store = null;
      }
    )
    const StringComp = easyComp(
      class extends Component {
        store = 'Hello World!';
      }
    )

    expect(() => new UndefinedComp()).not.toThrow()
    expect(() => new ObjectComp()).not.toThrow()
    expect(() => new NullComp()).toThrow()
    expect(() => new StringComp()).toThrow()
  })

  test('easyComp should respect shouldComponentUpdate', () => {
    const store = easyStore({ name: 'Bob' })
    const MyComp = easyComp(class extends Component {
      shouldComponentUpdate () {
        return false
      }
      render () {
        return <div>{store.name}</div>
      }
    })

    const comp = mount(<MyComp />)
    expect(comp.text()).toBe('Bob')
    store.name = 'Ann'
    expect(comp.text()).toBe('Bob')
  })

  test('easyStore should throw on non object argument', () => {
    expect(() => easyStore()).toThrow()
    expect(() => easyStore(null)).toThrow()
    expect(() => easyStore({})).not.toThrow()
  })
})
