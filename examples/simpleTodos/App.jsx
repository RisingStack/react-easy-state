import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import easyState from '../../src/easyState'

@easyState
class App extends Component {
  constructor () {
    super()
    this.state = {
      todo: '',
      todos: []
    }
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

ReactDOM.render(<App />, document.getElementById('react-root'))
