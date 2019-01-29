import React, { Component, StrictMode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import renderer from 'react-test-renderer'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center'
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center'
  },
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center'
  }
})

class Intro extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>
          This is a React Native snapshot test.
        </Text>
      </View>
    )
  }
}

describe('Native Clock App', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<Intro />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
