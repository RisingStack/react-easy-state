import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { easyComp } from 'react-easy-state'

@easyComp
class App extends Component {
  render() {
    return (
      <div>
        <div>Name: <input onChange={this.updateName}/></div>
        <p>Your name is: {this.state.name}</p>
      </div>
    )
  }

  updateName (ev) {
    this.state.name = ev.target.value
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'))
