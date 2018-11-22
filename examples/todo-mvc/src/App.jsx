import React from 'react'
import classNames from 'classnames'
import { view } from 'react-easy-state'
import TodoItem from './TodoItem'
import todos from './todosStore'

// these functions mutate the global store
// abstracting away events and view specific details here is a nice practice
// the global store methods should only handle pure data
function changeFilter (ev) {
  todos.filter = ev.target.value
}

// create a todo on Enter key press
function createTodo (ev) {
  if (ev.keyCode === 13 && ev.target.value) {
    todos.create(ev.target.value)
    ev.target.value = ''
  }
}

// this is re-rendered whenever the relevant parts of the used data stores change
export default view(() => {
  const {
    isEmpty,
    hasCompleted,
    allCompleted,
    active,
    filter,
    toggleAll,
    clearCompleted
  } = todos

  const todosClass = classNames({ selected: filter === 'all' })
  const completedClass = classNames({ selected: filter === 'completed' })
  const activeClass = classNames({ selected: filter === 'active' })

  return (
    <div className='todoapp'>
      <header className='header'>
        <h1>todos</h1>
        <input
          onKeyUp={createTodo}
          className='new-todo'
          placeholder='What needs to be done?'
          autoFocus
        />
      </header>

      {!isEmpty && (
        <section className='main'>
          <input
            className='toggle-all'
            type='checkbox'
            checked={allCompleted}
            onChange={toggleAll}
          />
          <label htmlFor='toggle-all'>Mark all as complete</label>
          <ul className='todo-list'>
            {todos[filter].map((todo, idx) => (
              <TodoItem {...todo} id={idx} key={idx} />
            ))}
          </ul>
        </section>
      )}

      {!isEmpty && (
        <footer className='footer'>
          <span className='todo-count'>{active.length} items left</span>
          <div className='filters'>
            <button className={todosClass} value='all' onClick={changeFilter}>
              All
            </button>
            <button
              className={activeClass}
              value='active'
              onClick={changeFilter}
            >
              Active
            </button>
            <button
              className={completedClass}
              value='completed'
              onClick={changeFilter}
            >
              Completed
            </button>
          </div>
          {hasCompleted && (
            <button className='clear-completed' onClick={clearCompleted}>
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  )
})
