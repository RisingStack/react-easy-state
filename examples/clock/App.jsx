import React, { Component } from 'react'
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

  // state can be manipulated as a plain JS object, instead of setState
  setTime () {
    this.state.time = moment().format('hh:mm:ss A')
  }

  // clean up the timer before the component is unmounted
  componentWillUnmount () {
    clearInterval(this.state.clock)
  }

  // render is automatically triggered whenever this.state.time changes
  render() {
    return <div>{this.state.time}</div>
  }
}

// wrap the component with easyComp before exporting it
export default easyComp(App)
