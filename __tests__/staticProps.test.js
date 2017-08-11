import { Component, PureComponent } from 'react'
import { easyComp, easyStore } from 'react-easy-state'

describe('static props', () => {
  test('easyComp should proxy react specific static properties from the component', () => {
    class Comp extends Component {}
    function FuncComp () {}

    Comp.displayName = FuncComp.displayName = 'Name'
    Comp.contextTypes = FuncComp.contextTypes = {}
    Comp.propTypes = FuncComp.propTypes = {}
    Comp.defaultProps = FuncComp.defaultProps = {}

    const EasyComp = easyComp(Comp)
    const EasyFuncComp = easyComp(FuncComp)

    expect(EasyComp.displayName).toBe(Comp.displayName)
    expect(EasyComp.contextTypes).toBe(Comp.contextTypes)
    expect(EasyComp.propTypes).toBe(Comp.propTypes)
    expect(EasyComp.defaultProps).toBe(Comp.defaultProps)

    expect(EasyFuncComp.displayName).toBe(FuncComp.displayName)
    expect(EasyFuncComp.contextTypes).toBe(FuncComp.contextTypes)
    expect(EasyFuncComp.propTypes).toBe(FuncComp.propTypes)
    expect(EasyFuncComp.defaultProps).toBe(FuncComp.defaultProps)
  })
})
