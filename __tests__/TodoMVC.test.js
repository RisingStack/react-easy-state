import React, { StrictMode } from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import App from '../examples/todo-mvc/src/App'

describe('TodoMVC App', () => {
  const { container } = render(
    <StrictMode>
      <App />
    </StrictMode>
  )
  afterAll(cleanup)

  test('should add todos', () => {
    expect(container).toMatchSnapshot('01. Initial state')

    const input = container.querySelector('.new-todo')

    fireEvent.keyUp(input, {
      keyCode: 13,
      target: { value: 'Test Todo' }
    })
    expect(container).toMatchSnapshot('02. Add Test Todo')

    fireEvent.keyUp(input, {
      keyCode: 13,
      target: { value: 'Other Todo' }
    })
    expect(container).toMatchSnapshot('03. Add Other Todo')

    fireEvent.keyUp(input, {
      keyCode: 27,
      target: { value: 'Final Tod' }
    })
    fireEvent.keyUp(input, {
      keyCode: 13,
      target: { value: 'Final Todo' }
    })
    expect(container).toMatchSnapshot('04. Add Final Todo')
  })

  test('should toggle todo status', () => {
    const toggles = container.querySelectorAll('.todo-list .toggle')

    fireEvent.click(toggles[0])
    expect(container).toMatchSnapshot('05. Toggle Test Todo to completed')

    fireEvent.click(toggles[1])
    expect(container).toMatchSnapshot('06. Toggle Other Todo to completed')

    fireEvent.click(toggles[0])
    expect(container).toMatchSnapshot('07. Toggle Test Todo to active')
  })

  test('should filter todos', () => {
    const completedFilter = container.querySelector(
      'button[value="completed"]'
    )
    const activeFilter = container.querySelector('button[value="active"]')
    const allFilter = container.querySelector('button[value="all"]')

    fireEvent.click(completedFilter)
    expect(container).toMatchSnapshot('08. Filter completed')

    fireEvent.click(activeFilter)
    expect(container).toMatchSnapshot('09. Filter active')

    fireEvent.click(allFilter)
    expect(container).toMatchSnapshot('10. Filter all')
  })

  test('should clear completed', () => {
    const clearCompleted = container.querySelector('.clear-completed')

    fireEvent.click(clearCompleted)
    expect(container).toMatchSnapshot('11. Clear completed')
  })

  test('should toggle all todo state at once', () => {
    const toggleAll = container.querySelector('.toggle-all')

    fireEvent.click(toggleAll)
    expect(container).toMatchSnapshot('12. Toggle all to completed')

    fireEvent.click(toggleAll)
    expect(container).toMatchSnapshot('13. Toggle all to active')
  })

  test('should delete todo', () => {
    const deleter = container.querySelector('.todo-list .destroy')

    fireEvent.click(deleter)
    expect(container).toMatchSnapshot('14. Delete Test Todo')
  })
})
