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
