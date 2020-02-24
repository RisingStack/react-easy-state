import React from 'old-react'
import { render } from '@testing-library/react/pure'
import { view, store } from 'react-easy-state'

describe('Using an old react version', () => {
  test.skip('Using local state in a function component with a version or react that has no hooks should throw an error', () => {
    const MyComp = view(() => {
      const person = store({ name: 'Bob' })
      return <div>{person.name}</div>
    })

    expect(render(<MyComp />)).toThrow()
  })
})
