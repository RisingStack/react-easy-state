import { Component, PureComponent } from 'react'
import { easyComp, easyStore } from 'react-easy-state'

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

  test('easyComp should throw when shouldComponentUpdate is defined', () => {
    class DefinedComp extends Component {
      shouldComponentUpdate () {}
    }
    expect(() => easyComp(DefinedComp)).toThrow()
  })

  test('easyStore should throw on non object argument', () => {
    expect(() => easyStore()).toThrow()
    expect(() => easyStore(null)).toThrow()
    expect(() => easyStore({})).not.toThrow()
  })
})
