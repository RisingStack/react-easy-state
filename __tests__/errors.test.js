import { easyComp, easyStore } from 'react-easy-state'

describe('errors', () => {
  test('easyComp should throw on non function arguments', () => {
    expect(() => easyComp()).toThrow('easyComp expects a component class or function as argument.')
    expect(() => easyComp(12)).toThrow('easyComp expects a component class or function as argument.')
    expect(() => easyComp(() => {})).not.toThrow()
    expect(() => easyComp(class {})).not.toThrow()
  })

  test('easyStore should throw on non object argument', () => {
    expect(() => easyStore()).toThrow('easyStore expects an object as argument.')
    expect(() => easyStore(null)).toThrow('easyStore expects an object as argument.')
    expect(() => easyStore({})).not.toThrow()
  })
})
