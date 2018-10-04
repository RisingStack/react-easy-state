import React from 'react'
import { view, store } from 'react-easy-state'
import { mount } from 'enzyme'

describe('batching', () => {
  test('should not batch "vanilla state changes"', () => {
    let renderCount = 0
    const person = store({ name: 'Bob' })
    const MyComp = view(() => {
      renderCount++
      return <div>{person.name}</div>
    })

    const comp = mount(<MyComp />)
    expect(renderCount).toBe(1)
    expect(comp.text()).toBe('Bob')
    person.name = 'Ann'
    person.name = 'Rick'
    expect(comp.text()).toBe('Rick')
    expect(renderCount).toBe(3)
  })

  test('should batch changes in setTimeout and setInterval', async () => {
    let renderCount = 0
    const person = store({ name: 'Bob' })
    const MyComp = view(() => {
      renderCount++
      return <div>{person.name}</div>
    })

    const comp = mount(<MyComp />)
    expect(renderCount).toBe(1)
    expect(comp.text()).toBe('Bob')
    await new Promise(resolve =>
      setTimeout(() => {
        person.name = 'Ann'
        person.name = 'Rick'
        resolve()
      }, 100)
    )
    expect(comp.text()).toBe('Rick')
    expect(renderCount).toBe(2)
  })

  test('should batch changes in requestAnimationFrame and requestIdleCallback', async () => {
    let renderCount = 0
    const person = store({ name: 'Bob' })
    const MyComp = view(() => {
      renderCount++
      return <div>{person.name}</div>
    })

    const comp = mount(<MyComp />)
    expect(renderCount).toBe(1)
    expect(comp.text()).toBe('Bob')
    await new Promise(resolve =>
      // eslint-disable-next-line
      requestAnimationFrame(() => {
        person.name = 'Ann'
        person.name = 'Rick'
        resolve()
      })
    )
    expect(comp.text()).toBe('Rick')
    expect(renderCount).toBe(2)
  })

  test('should batch changes in Promise.then and Promise.catch', async () => {
    let renderCount = 0
    const person = store({ name: 'Bob' })
    const MyComp = view(() => {
      renderCount++
      return <div>{person.name}</div>
    })

    const comp = mount(<MyComp />)
    expect(renderCount).toBe(1)
    expect(comp.text()).toBe('Bob')
    await Promise.resolve().then(() => {
      person.name = 'Ann'
      person.name = 'Rick'
    })
    expect(comp.text()).toBe('Rick')
    expect(renderCount).toBe(2)

    await Promise.reject(new Error()).catch(() => {
      person.name = 'Ben'
      person.name = 'Morty'
    })
    expect(comp.text()).toBe('Morty')
    expect(renderCount).toBe(3)
  })

  test('should batch changes in async function parts', async () => {
    let renderCount = 0
    const person = store({ name: 'Bob' })
    const MyComp = view(() => {
      renderCount++
      return <div>{person.name}</div>
    })

    const comp = mount(<MyComp />)
    expect(renderCount).toBe(1)
    expect(comp.text()).toBe('Bob')
    await Promise.resolve()
    person.name = 'Ann'
    person.name = 'Rick'
    // ISSUE -> here it is not yet updated!!! -> the then block is not over I guess
    await Promise.resolve()
    expect(comp.text()).toBe('Rick')
    expect(renderCount).toBe(2)
  })
})
