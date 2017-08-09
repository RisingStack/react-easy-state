import React, { Component } from 'react'
import classNames from 'classnames'
import { easyComp } from 'react-easy-state'
import store from './store'

class TodoItem extends Component {
  remove () {
    store.remove(this.props.todo)
  }

  toggle () {
    const { todo } = this.props
    todo.completed = !todo.completed
  }

  // render is triggered whenever the relevant parts of the component props or global store change
  render () {
    const { toggle, remove } = this
    const { todo } = this.props

    const itemClass = classNames({ view: true, completed: todo.completed })

    return (
      <li className={itemClass}>
        <input className='toggle' type='checkbox' checked={todo.completed} onChange={toggle} />
        <label>{todo.title}</label>
        <button onClick={remove} className='destroy' />
      </li>
    )
  }
}

// wrap the component with easyComp before exporting it
export default easyComp(TodoItem)
