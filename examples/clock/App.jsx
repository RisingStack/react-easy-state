import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { easyComp } from 'react-easy-state'

class App extends Component {
  constructor () {
    super()

    this.state = {
      clock: setInterval(() => this.setTime(), 1000)
    }
    this.setTime()
  }

  setTime () {
    this.state.time = moment().format('hh:mm:ss A')
  }

  componentWillUnmount () {
    clearInterval(this.state.clock)
  }

  render() {
    return <div>{this.state.time}</div>
  }
}

const app = React.createElement(easyComp(App))
ReactDOM.render(app, document.getElementById('react-root'))
