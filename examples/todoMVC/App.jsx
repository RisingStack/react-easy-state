import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { easyComp } from 'react-easy-state'
import TodoItem from './TodoItem'
import store from './store'

@easyComp
class App extends Component {
  render () {
    const { create, changeFilter, clearCompleted, toggleAll } = this
    const { todos, hasTodos, hasCompleted, allCompleted, active, filter } = store

    const todosClass = classNames({ selected: filter === 'todos' })
    const completedClass = classNames({ selected: filter === 'completed' })
    const activeClass = classNames({ selected: filter === 'active' })

    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input onKeyDown={create} className="new-todo" placeholder="What needs to be done?" autoFocus={true}/>
        </header>

        {hasTodos && <section className="main">
          <input className="toggle-all" type="checkbox" checked={allCompleted} onChange={toggleAll}/>
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {store[filter].map(todo => <TodoItem key={todo.title} todo={todo} todos={todos}/>)}
          </ul>
        </section>}

        {hasTodos && <footer className="footer">
          <span className="todo-count">{active.length} items left</span>
          <div className="filters">
            <button className={todosClass} value="todos" onClick={changeFilter}>All</button>
            <button className={activeClass} value="active" onClick={changeFilter}>Active</button>
            <button className={completedClass} value="completed" onClick={changeFilter}>Completed</button>
          </div>
          {hasCompleted && <button className="clear-completed" onClick={clearCompleted}>
            Clear completed
          </button>}
        </footer>}
      </div>
    )
  }

  create (ev) {
    if (ev.keyCode === 13) {
      store.todos.push({ title: ev.target.value })
      ev.target.value = ''
    }
  }

  clearCompleted () {
    store.todos = store.active
  }

  toggleAll () {
    store.allCompleted = !store.allCompleted
  }

  changeFilter (ev) {
    store.filter = ev.target.value
  }
}

ReactDOM.render(<App/>, document.getElementById('react-root'))
