import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { view, store, batch } from 'react-easy-state'

describe('batching', () => {
  afterEach(cleanup)

  test('should batch state changes inside a batch() wrapper', () => {
    let renderCount = 0
    const person = store({ name: 'Bob' })
    const MyComp = view(() => {
      renderCount++
      return <div>{person.name}</div>
    })

    const { container } = render(<MyComp />)
    expect(renderCount).toBe(1)
    expect(container).toHaveTextContent('Bob')
    batch(() => {
      person.name = 'Ann'
      person.name = 'Rick'
    })
    expect(container).toHaveTextContent('Rick')
    expect(renderCount).toBe(2)
  })

  test('should work with nested batch() calls', () => {
    let renderCount = 0
    const person = store({ name: 'Bob' })
    const MyComp = view(() => {
      renderCount++
      return <div>{person.name}</div>
    })

    const { container } = render(<MyComp />)
    expect(renderCount).toBe(1)
    expect(container).toHaveTextContent('Bob')
    batch(() => {
      batch(() => {
        person.name = 'Rob'
        person.name = 'David'
      })
      expect(container).toHaveTextContent('Bob')
      person.name = 'Ann'
      person.name = 'Rick'
    })
    expect(container).toHaveTextContent('Rick')
    expect(renderCount).toBe(2)
  })

  test('should batch state changes inside native event listeners', () => {
    let renderCount = 0
    const person = store({ name: 'Bob' })
    const MyComp = view(() => {
      renderCount++
      return <div>{person.name}</div>
    })

    const { container } = render(<MyComp />)
    expect(renderCount).toBe(1)
    expect(container).toHaveTextContent('Bob')
    const batched = () => {
      person.name = 'Ann'
      person.name = 'Rick'
    }
    document.body.addEventListener('click', batched)
    document.body.dispatchEvent(new Event('click'))
    expect(container).toHaveTextContent('Rick')
    expect(renderCount).toBe(2)
    document.body.removeEventListener('click', batched)
  })

  // async/await is only batched when it is transpiled to promises and/or generators
  // by the time transpilation won't be necessary, the batching will change to use async React
  test('should batch changes in setTimeout and setInterval', async () => {
    let renderCount = 0
    const person = store({ name: 'Bob' })
    const MyComp = view(() => {
      renderCount++
      return <div>{person.name}</div>
    })

    const { container } = render(<MyComp />)
    expect(renderCount).toBe(1)
    expect(container).toHaveTextContent('Bob')
    await new Promise(resolve =>
      setTimeout(() => {
        person.name = 'Ann'
        person.name = 'Rick'
        resolve()
      }, 100)
    )
    expect(container).toHaveTextContent('Rick')
    expect(renderCount).toBe(2)
  })

  test('should batch changes in requestAnimationFrame and requestIdleCallback', async () => {
    let renderCount = 0
    const person = store({ name: 'Bob' })
    const MyComp = view(() => {
      renderCount++
      return <div>{person.name}</div>
    })

    const { container } = render(<MyComp />)
    expect(renderCount).toBe(1)
    expect(container).toHaveTextContent('Bob')
    await new Promise(resolve =>
      // eslint-disable-next-line
      requestAnimationFrame(() => {
        person.name = 'Ann'
        person.name = 'Rick'
        resolve()
      })
    )
    expect(container).toHaveTextContent('Rick')
    expect(renderCount).toBe(2)
  })

  test('should batch changes in Promise.then and Promise.catch', async () => {
    let renderCount = 0
    const person = store({ name: 'Bob' })
    const MyComp = view(() => {
      renderCount++
      return <div>{person.name}</div>
    })

    const { container } = render(<MyComp />)
    expect(renderCount).toBe(1)
    expect(container).toHaveTextContent('Bob')
    await Promise.resolve().then(() => {
      person.name = 'Ann'
      person.name = 'Rick'
    })
    expect(container).toHaveTextContent('Rick')
    expect(renderCount).toBe(2)

    await Promise.reject(new Error()).catch(() => {
      person.name = 'Ben'
      person.name = 'Morty'
    })
    expect(container).toHaveTextContent('Morty')
    expect(renderCount).toBe(3)
  })

  test('should batch changes in async function parts', async () => {
    let renderCount = 0
    const person = store({ name: 'Bob' })
    const MyComp = view(() => {
      renderCount++
      return <div>{person.name}</div>
    })

    const { container } = render(<MyComp />)
    expect(renderCount).toBe(1)
    expect(container).toHaveTextContent('Bob')
    await Promise.resolve()
    person.name = 'Ann'
    person.name = 'Rick'
    // ISSUE -> here it is not yet updated!!! -> the then block is not over I guess
    await Promise.resolve()
    expect(container).toHaveTextContent('Rick')
    expect(renderCount).toBe(2)
  })

  test('should not break Promises', async () => {
    await Promise.resolve(12)
      .then(value => {
        expect(value).toBe(12)
        // eslint-disable-next-line
        throw 15;
      })
      .catch(err => {
        expect(err).toBe(15)
      })
  })

  test('should not break setTimeout', async () => {
    await new Promise(resolve => {
      setTimeout(
        (arg1, arg2, arg3) => {
          expect(arg1).toBe('Hello')
          expect(arg2).toBe('World')
          expect(arg3).toBe(undefined)
          resolve()
        },
        100,
        'Hello',
        'World'
      )
    })
  })

  test('should not break event listeners', () => {
    let callCount = 0
    const fn = () => callCount++
    document.body.addEventListener('click', fn)

    expect(callCount).toBe(0)
    document.body.dispatchEvent(new Event('click'))
    expect(callCount).toBe(1)
    document.body.removeEventListener('click', fn)
    document.body.dispatchEvent(new Event('click'))
    expect(callCount).toBe(1)
  })

  test('should not break method this value and args', done => {
    const socket = new WebSocket('ws://www.example.com')

    socket.onclose = function (ev) {
      expect(ev).toBeDefined()
      expect(this).toBe(socket)
      done()
    }

    socket.close()
  })

  test('should not break callback this value and args', done => {
    const ctx = {}

    setTimeout(
      function (arg1, arg2) {
        expect(arg1).toBe('Test')
        expect(arg2).toBe('Test2')
        expect(this).toBe(ctx)
        done()
      }.bind(ctx),
      0,
      'Test',
      'Test2'
    )
  })

  test('should not break return value', () => {
    const result = batch(() => 12)
    expect(result).toBe(12)
  })
})
