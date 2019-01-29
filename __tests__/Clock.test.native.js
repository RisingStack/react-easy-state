import React from 'react'
import { Text } from 'react-native'
import { render } from 'react-native-testing-library'
import { view, store, batch } from 'react-easy-state'

describe('batching', () => {
  test('should batch state changes inside a batch() wrapper', () => {
    let renderCount = 0
    const person = store({ name: 'Bob' })
    const MyComp = view(() => {
      renderCount++
      return <Text>{person.name}</Text>
    })

    const { getByText } = render(<MyComp />)
    expect(getByText('Bob')).toBeDefined()
    expect(renderCount).toBe(1)
    batch(() => {
      person.name = 'Ann'
      person.name = 'Rick'
    })
    expect(getByText('Rick')).toBeDefined()
    expect(renderCount).toBe(2)
  })
})
