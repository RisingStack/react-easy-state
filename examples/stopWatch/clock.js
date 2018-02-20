import { store } from 'react-easy-state'
import moment from 'moment'

// use 'clock' instead of 'this' in the store methods to make them passable as callbacks
const clock = store({
  ticks: 0,
  start () {
    clock.intervalId = setInterval(() => clock.ticks++, 10)
  },
  stop () {
    clock.intervalId = clearInterval(clock.intervalId)
  },
  get time () {
    const time = moment(0).millisecond(clock.ticks * 10)

    return {
      seconds: time.format('mm:ss'),
      fraction: time.format('SS')
    }
  },
  get isTicking () {
    return clock.intervalId !== undefined
  },
  toggle () {
    clock.isTicking ? clock.stop() : clock.start()
  },
  reset () {
    clock.ticks = 0
    clock.stop()
  }
})

export default clock
