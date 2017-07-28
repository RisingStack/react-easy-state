import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { easyComp } from 'react-easy-state'

class App extends Component {
  state = {
    todo: '',
    todos: []
  }

  render() {
    const { todos, todo } = this.state

    return (
      <div>
        <input value={todo} onChange={this.updateTodo} />
        <button onClick={this.addTodo}>Add Todo</button>
        <ul>
          {todos.map(todo => <li key={todo}>{todo}</li>)}
        </ul>
      </div>
    )
  }

  updateTodo (ev) {
    this.state.todo = ev.target.value
  }

  addTodo (ev) {
    const { state } = this
    state.todos.push(state.todo)
    state.todo = ''
  }
}

const app = React.createElement(easyComp(App))
ReactDOM.render(app, document.getElementById('react-root'))
