import React, { Component } from 'react'
import { render, cleanup } from 'react-testing-library'
import { view, store } from 'react-easy-state'

describe('devtool', () => {
  let devtool

  beforeAll(() => {
    devtool = jest.fn()
  })
  afterAll(() => {
    devtool = undefined
  })
  afterEach(cleanup)

  test('devtool should be called on store mutations, renders and get operations - related to a view', () => {
    const rawPerson = { name: 'Bob' }
    const person = store(rawPerson)
    const rawComp = () => <div>{person.name}</div>
    const MyComp = view(rawComp, { devtool })

    render(<MyComp />)

    devtool.mockClear()
    person.name = 'Ann'

    expect(devtool.mock.calls.length).toBe(3)
    expect(devtool.mock.calls[0][0]).toEqual({
      Component: rawComp,
      target: rawPerson,
      key: 'name',
      value: 'Ann',
      oldValue: 'Bob',
      receiver: person,
      type: 'set'
    })
    expect(devtool.mock.calls[1][0]).toEqual({
      Component: rawComp,
      type: 'render',
      renderType: 'reactive'
    })
    expect(devtool.mock.calls[2][0]).toEqual({
      Component: rawComp,
      target: rawPerson,
      key: 'name',
      receiver: person,
      type: 'get'
    })
  })

  test('devtool should be called on view render because of props change', () => {
    const rawPerson = { name: 'Bob' }
    const person = store(rawPerson)
    const rawChild = ({ name }) => <div>{name}</div>
    const Child = view(rawChild, { devtool })
    const rawComp = () => <Child name={person.name} />
    const MyComp = view(rawComp, { devtool })

    render(<MyComp />)
    devtool.mockClear()

    person.name = 'Ann'

    expect(devtool.mock.calls.length).toBe(4)
    expect(devtool.mock.calls[0][0]).toEqual({
      Component: rawComp,
      target: rawPerson,
      key: 'name',
      value: 'Ann',
      oldValue: 'Bob',
      receiver: person,
      type: 'set'
    })
    expect(devtool.mock.calls[1][0]).toEqual({
      Component: rawComp,
      type: 'render',
      renderType: 'reactive'
    })
    expect(devtool.mock.calls[2][0]).toEqual({
      Component: rawComp,
      target: rawPerson,
      key: 'name',
      receiver: person,
      type: 'get'
    })
    expect(devtool.mock.calls[3][0]).toEqual({
      Component: rawChild,
      type: 'render',
      renderType: 'normal',
      oldProps: { name: 'Bob' },
      props: { name: 'Ann' }
    })
  })

  test('devtool should be called on renders blocked with shouldComponentUpdate', () => {
    const rawPerson = { name: 'Bob' }
    const person = store(rawPerson)
    class RawComp extends Component {
      render() {
        return <div>{person.name}</div>
      }
      shouldComponentUpdate() {
        return false
      }
    }
    const MyComp = view(RawComp, { devtool })

    render(<MyComp />)

    devtool.mockClear()
    person.name = 'Ann'

    expect(devtool.mock.calls.length).toBe(2)
    expect(devtool.mock.calls[0][0]).toEqual({
      Component: RawComp,
      target: rawPerson,
      key: 'name',
      value: 'Ann',
      oldValue: 'Bob',
      receiver: person,
      type: 'set'
    })
    expect(devtool.mock.calls[1][0]).toEqual({
      Component: RawComp,
      type: 'render',
      renderType: 'blocked'
    })
  })

  test('devtool should not be called on store mutations - unrelated to a view', () => {
    const rawPerson = { name: 'Bob' }
    const person = store(rawPerson)
    const rawComp = () => <div>{person.name}</div>
    const MyComp = view(rawComp, { devtool })

    render(<MyComp />)

    devtool.mockClear()
    person.age = 40

    expect(devtool.mock.calls.length).toBe(0)
  })
})
