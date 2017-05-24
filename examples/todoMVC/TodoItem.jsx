import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import easyState from '../../src/easyState'

@easyState
export default class TodoItem extends Component {
  render () {
    const { toggle, remove } = this
    const { todo } = this.props

    const itemClass = classNames({
      view: true,
      completed: todo.completed
    })

    return (
			<li className={itemClass}>
				<input className="toggle" type="checkbox" checked={todo.completed} onChange={toggle} />
				<label>{todo.title}</label>
				<button onClick={remove} className="destroy" />
			</li>
    )
  }

  remove () {
    const { todos, todo } = this.props
    todos.splice(todos.indexOf(todo), 1)
  }

  toggle () {
    const { todo } = this.props
    todo.completed = !todo.completed
  }
}
