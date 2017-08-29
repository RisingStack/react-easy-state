import React, { Component } from 'react'
import moment from 'moment'
import { easyComp } from 'react-easy-state'

class App extends Component {
  constructor () {
    super()

    this.store = {
      clock: setInterval(() => this.setTime(), 1000)
    }
    this.setTime()
  }

  // the store can be manipulated as a plain JS object
  setTime () {
    this.store.time = moment().utc().format('hh:mm:ss A')
  }

  // clean up the timer before the component is unmounted
  componentWillUnmount () {
    clearInterval(this.store.clock)
  }

  // render is automatically triggered whenever this.store.time changes
  render () {
    return <div>{this.store.time}</div>
  }
}

// wrap the component with easyComp before exporting it
export default easyComp(App)
