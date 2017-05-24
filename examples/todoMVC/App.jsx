import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import easyState from '../../src/easyState'
import TodoItem from './TodoItem.jsx'
import State from './State'

@easyState
class App extends Component {
  constructor () {
    super()
    this.state = new State()
  }

  render() {
    const { create, changeFilter, clearCompleted, toggleAll, state } = this
    const { todos, hasTodos, completed, hasCompleted, allCompleted, active, filter } = state

    const todosClass = classNames({selected: filter === 'todos'})
    const completedClass = classNames({selected: filter === 'completed'})
    const activeClass = classNames({selected: filter === 'active'})

    return (
      <div className="todoapp">
  			<header className="header">
  				<h1>todos</h1>
  				<input onKeyDown={create} className="new-todo"
  					placeholder="What needs to be done?" autoFocus={true} />
  			</header>

  			{hasTodos && <section className="main">
  				<input className="toggle-all" type="checkbox"
            checked={allCompleted} onChange={toggleAll} />
  				<label htmlFor="toggle-all">Mark all as complete</label>
  				<ul className="todo-list">
            {state[filter].map(todo =>
              <TodoItem key={todo.title} todo={todo} todos={todos} />)}
  				</ul>
  			</section>}

        {hasTodos && <footer className="footer">
  				<span className="todo-count">{active.length} items left</span>
  				<div className="filters">
  					<button className={todosClass} value="todos" onClick={changeFilter}>All</button>
  					<button className={activeClass} value="active" onClick={changeFilter}>Active</button>
  					<button className={completedClass} value ="completed" onClick={changeFilter}>Completed</button>
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
      this.state.todos.push({ title: ev.target.value })
      ev.target.value = ''
    }
  }

  clearCompleted () {
    const { state } = this
    state.todos = state.active
  }

  toggleAll () {
    const { state } = this
    state.allCompleted = !state.allCompleted
  }

  changeFilter (ev) {
    this.state.filter = ev.target.value
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'))
