import React, { Component } from 'react'
import moment from 'moment'
import { view, store } from 'react-easy-state'

class App extends Component {
  // create a local store
  clock = store({
    id: setInterval(() => this.setTime(), 1000),
    time: moment()
      .utc()
      .format('hh:mm:ss A')
  })

  // the clock store can be manipulated as a plain JS object
  setTime() {
    this.clock.time = moment()
      .utc()
      .format('hh:mm:ss A')
  }

  // clean up the timer before the component is unmounted
  componentWillUnmount() {
    clearInterval(this.clock.id)
  }

  // render is automatically triggered whenever this.clock.time changes
  render() {
    return <div data-testid="time">{this.clock.time}</div>
  }
}

// wrap the component with view() before exporting it
export default view(App)
