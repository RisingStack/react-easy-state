import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import easyState from '../../src/easyState'

@easyState
class App extends Component {
  render() {
    const { name } = this.state

    return (
      <div>
        <div>Name: <input onChange={this.updateName}/></div>
        <p>Your name is: {name}</p>
      </div>
    )
  }

  updateName (ev) {
    this.state.name = ev.target.value
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'))
