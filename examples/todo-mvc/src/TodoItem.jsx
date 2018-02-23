import React, { Component } from 'react'
import classNames from 'classnames'
import { view } from 'react-easy-state'
import todos from './todosStore'

class TodoItem extends Component {
  remove = () => {
    todos.remove(this.props.id)
  };

  toggle = () => {
    todos.toggle(this.props.id)
  };

  // render is triggered whenever the relevant parts of the component props or global todos store change
  render () {
    const { toggle, remove } = this
    const { title, completed = false } = this.props

    const itemClass = classNames({ view: true, completed })

    return (
      <li className={itemClass}>
        <input
          className='toggle'
          type='checkbox'
          checked={completed}
          onChange={toggle}
        />
        <label>{title}</label>
        <button onClick={remove} className='destroy' />
      </li>
    )
  }
}

// wrap the component with view() before exporting it
export default view(TodoItem)
