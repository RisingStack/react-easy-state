import { Component } from 'react'
import { view } from 'react-easy-state'

describe('static props', () => {
  test('view() should proxy react specific static properties from the component', () => {
    class Comp extends Component {}
    function FuncComp () {}

    Comp.displayName = FuncComp.displayName = 'Name'
    Comp.contextTypes = FuncComp.contextTypes = {}
    Comp.propTypes = FuncComp.propTypes = {}
    Comp.defaultProps = FuncComp.defaultProps = {}

    const ViewComp = view(Comp)
    const ViewFuncComp = view(FuncComp)

    expect(ViewComp.displayName).toBe(Comp.displayName)
    expect(ViewComp.contextTypes).toBe(Comp.contextTypes)
    expect(ViewComp.propTypes).toBe(Comp.propTypes)
    expect(ViewComp.defaultProps).toBe(Comp.defaultProps)

    expect(ViewFuncComp.displayName).toBe(FuncComp.displayName)
    expect(ViewFuncComp.contextTypes).toBe(FuncComp.contextTypes)
    expect(ViewFuncComp.propTypes).toBe(FuncComp.propTypes)
    expect(ViewFuncComp.defaultProps).toBe(FuncComp.defaultProps)
  })

  test('view() should proxy react specific static getters', () => {
    class Comp extends Component {
      static get defaultProps () {
        return { key: 'value' }
      }
    }

    const ViewComp = view(Comp)
    expect(ViewComp.defaultProps).toEqual(Comp.defaultProps)
  })
})
