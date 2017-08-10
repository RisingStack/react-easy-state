import React from 'react'
import classNames from 'classnames'
import { easyComp } from 'react-easy-state'
import TodoItem from './TodoItem'
import store from './store'

// render is triggered whenever the relevant parts of the global store change
function App () {
  const { hasTodos, hasCompleted, allCompleted, active, filter,
          create, changeFilter, toggleAll, clearCompleted } = store

  const todosClass = classNames({ selected: filter === 'todos' })
  const completedClass = classNames({ selected: filter === 'completed' })
  const activeClass = classNames({ selected: filter === 'active' })

  return (
    <div className='todoapp'>
      <header className='header'>
        <h1>todos</h1>
        <input onKeyUp={create} className='new-todo' placeholder='What needs to be done?' autoFocus />
      </header>

      {hasTodos && <section className='main'>
        <input className='toggle-all' type='checkbox' checked={allCompleted} onChange={toggleAll} />
        <label htmlFor='toggle-all'>Mark all as complete</label>
        <ul className='todo-list'>
          {store[filter].map((todo, idx) => <TodoItem {...todo} id={idx} key={idx} />)}
        </ul>
      </section>}

      {hasTodos && <footer className='footer'>
        <span className='todo-count'>{active.length} items left</span>
        <div className='filters'>
          <button className={todosClass} value='todos' onClick={changeFilter}>All</button>
          <button className={activeClass} value='active' onClick={changeFilter}>Active</button>
          <button className={completedClass} value='completed' onClick={changeFilter}>Completed</button>
        </div>
        {hasCompleted && <button className='clear-completed' onClick={clearCompleted}>
          Clear completed
        </button>}
      </footer>}
    </div>
  )
}

// wrap the component with easyComp before exporting it
export default easyComp(App)
