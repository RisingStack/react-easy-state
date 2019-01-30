import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { view, store } from 'react-easy-state'
import moment from 'moment'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 40
  }
})

function getFormattedTime () {
  return moment()
    .utc()
    .format('hh:mm:ss A')
}

class App extends React.Component {
  clock = store({ time: getFormattedTime() });

  componentDidMount () {
    this.interval = setInterval(
      () => (this.clock.time = getFormattedTime()),
      1000
    )
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.clock.time}</Text>
      </View>
    )
  }
}

export default view(App)
