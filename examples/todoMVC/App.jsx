import React, { Component } from 'react'
import classNames from 'classnames'
import { easyComp } from 'react-easy-state'
import TodoItem from './TodoItem'
import todos from './store'

// render is triggered whenever the relevant parts of the global todos store change
class App extends Component {
  changeFilter (ev) {
    todos.changeFilter(ev.target.value)
  }

  // create a todo on Enter key press
  createTodo (ev) {
    if (ev.keyCode === 13 && ev.target.value) {
      todos.create(ev.target.value)
      ev.target.value = ''
    }
  }

  render () {
    const { isEmpty, hasCompleted, allCompleted, active, filter, toggleAll, clearCompleted } = todos

    const todosClass = classNames({ selected: filter === 'all' })
    const completedClass = classNames({ selected: filter === 'completed' })
    const activeClass = classNames({ selected: filter === 'active' })

    return (
      <div className='todoapp'>
        <header className='header'>
          <h1>todos</h1>
          <input onKeyUp={this.createTodo} className='new-todo' placeholder='What needs to be done?' autoFocus />
        </header>

        {!isEmpty && <section className='main'>
          <input className='toggle-all' type='checkbox' checked={allCompleted} onChange={toggleAll} />
          <label htmlFor='toggle-all'>Mark all as complete</label>
          <ul className='todo-list'>
            {todos[filter].map((todo, idx) => <TodoItem {...todo} id={idx} key={idx} />)}
          </ul>
        </section>}

        {!isEmpty && <footer className='footer'>
          <span className='todo-count'>{active.length} items left</span>
          <div className='filters'>
            <button className={todosClass} value='all' onClick={this.changeFilter}>All</button>
            <button className={activeClass} value='active' onClick={this.changeFilter}>Active</button>
            <button className={completedClass} value='completed' onClick={this.changeFilter}>Completed</button>
          </div>
          {hasCompleted && <button className='clear-completed' onClick={clearCompleted}>
            Clear completed
          </button>}
        </footer>}
      </div>
    )
  }
}

// wrap the component with easyComp before exporting it
export default easyComp(App)
