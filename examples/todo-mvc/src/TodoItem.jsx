import React, { Component } from 'react'
import classNames from 'classnames'
import { view } from 'react-easy-state'
import todos from './todosStore'

// wrap the component with view() before exporting it
export default view(({ id, title, completed = false }) => {
  const itemClass = classNames({ view: true, completed })

  return (
    <li className={itemClass}>
      <input
        className="toggle"
        type="checkbox"
        checked={completed}
        onChange={() => todos.toggle(id)}
      />
      <label>{title}</label>
      <button onClick={() => todos.remove(id)} className="destroy" />
    </li>
  )
})
