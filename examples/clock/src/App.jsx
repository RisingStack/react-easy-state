import React, { useEffect } from 'react'
import moment from 'moment'
import { view, store } from 'react-easy-state'

function getFormattedTime() {
  return moment()
    .utc()
    .format('hh:mm:ss A')
}

export default view(() => {
  // create a local store
  const clock = store({
    time: getFormattedTime()
  })

  useEffect(() => {
    const id = setInterval(() => (clock.time = getFormattedTime()), 1000)
    return () => clearInterval(id)
  }, [])

  return <div>{clock.time}</div>
})
