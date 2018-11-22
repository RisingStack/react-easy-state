import React from 'react'
import classNames from 'classnames'
import { view } from 'react-easy-state'
import todos from './todosStore'

// this is re-rendered whenever the relevant parts of the used data stores change
export default view(({ id, title, completed = false }) => {
  const itemClass = classNames({ view: true, completed })

  return (
    <li className={itemClass}>
      <input
        className='toggle'
        type='checkbox'
        checked={completed}
        onChange={() => todos.toggle(id)}
      />
      <label>{title}</label>
      <button onClick={() => todos.remove(id)} className='destroy' />
    </li>
  )
})
