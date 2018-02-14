import React from 'react'
import { view, store } from 'react-easy-state'
import { mount } from 'enzyme'

describe('devtool', () => {
  let devtool

  beforeAll(() => {
    devtool = jest.fn()
  })
  afterAll(() => {
    devtool = undefined
  })

  test('devtool should be called on store mutations, renders and get operations - related to a view', () => {
    const rawPerson = { name: 'Bob' }
    const person = store(rawPerson)
    const rawComp = () => <div>{person.name}</div>
    const MyComp = view(rawComp, { devtool })

    mount(<MyComp />)

    devtool.mockClear()
    person.name = 'Ann'

    expect(devtool.mock.calls.length).toBe(2)
    expect(devtool.mock.calls[0][0]).toEqual({
      Component: rawComp,
      target: rawPerson,
      key: 'name',
      value: 'Ann',
      oldValue: 'Bob',
      receiver: person,
      type: 'set'
    })
    /* expect(devtool.mock.calls[1][0]).toEqual({
      Component: rawComp,
      type: 'render'
    }) */
    expect(devtool.mock.calls[1][0]).toEqual({
      Component: rawComp,
      target: rawPerson,
      key: 'name',
      receiver: person,
      type: 'get'
    })
  })

  test('devtool should not be called on store mutations - unrelated to a view', () => {
    const rawPerson = { name: 'Bob' }
    const person = store(rawPerson)
    const rawComp = () => <div>{person.name}</div>
    const MyComp = view(rawComp, { devtool })

    mount(<MyComp />)

    devtool.mockClear()
    person.age = 40

    expect(devtool.mock.calls.length).toBe(0)
  })
})
