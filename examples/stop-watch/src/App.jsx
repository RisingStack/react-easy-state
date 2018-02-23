import React from 'react'
import { view } from 'react-easy-state'
import clock from './clock'

function StopWatch () {
  const { time, toggle, reset, isTicking } = clock
  const label = isTicking ? 'Stop' : 'Start'

  return (
    <div>
      <div>
        {time.seconds}
        <small>{time.fraction}</small>
      </div>
      <button onClick={toggle}>{label}</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default view(StopWatch)
