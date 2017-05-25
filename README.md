# React Easy State

Easy State aims to make React's state management simpler without adding new syntax. To achieve this it makes the following modifications.

- It replaces React's `setState()` with plain native JavaScript.
- It auto binds your component's methods.

## Installation

`npm i react-easy-state --save`

## Usage

```js
import React, { Component } from 'react'
import easyState from 'react-easy-state'

@easyState
export default class App extends Component {
  render() {
    const { name } = this.state

    return (
      <div>
        <div>Name: <input onChange={this.updateName}/></div>
        <p>Hello {name}!</p>
      </div>
    )
  }

  updateName (ev) {
    this.state.name = ev.target.value
  }
}
```

### About decorators

`@easyState` is a decorator, which is not yet part of the JS language. You can learn how to enable decorators with babel [here](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) or you can use the older `export default easyState(Comp)` syntax.

## Key features

- Your state can use any valid JavaScript. Feel free to use nested objects, arrays, expando properties, getters/setters, inheritance and ES6 collections directly.

- State mutations are picked up and they trigger the render method when appropriate.

- The render method is only triggered if it is affected by state mutations. If it doesn't use the mutated part of the state or the mutation doesn't change the state, the render method is not triggered.

- The render method is never executed immediately. Triggered renders are collected in a batch and executed in one go after a small delay.

- Duplicates renders are removed. A render never runs twice in one batch - no matter how many times it got triggered. Renders run in first trigger order.

- Renders may trigger others renders by mutating the state. In this case loops are automatically resolved.

- Renders always run before the next repaint.

As a result a stable and fresh state and view is always achieved before the next repaint with the minimal number of required renders.

## Examples with live demos

- [Hello World](https://solkimicreb.github.io/react-easy-state/examples/helloWorld/) ([source](/examples/helloWorld/))
- [Simple Todos](https://solkimicreb.github.io/react-easy-state/examples/simpleTodos/) ([source](/examples/simpleTodos/))
- [TodoMVC](https://solkimicreb.github.io/react-easy-state/examples/todoMVC/) ([source](/examples/todoMVC/))

## Platform support

- Node: 6 and above
- Chrome: 49 and above
- Firefox: 38 and above
- Safari: 10 and above
- Edge: 12 and above
- Opera: 36 and above
- React native is not yet supported
- IE is not supported

## How does it work?

Under the hood it uses the [@nx-js/observer-util](https://github.com/nx-js/observer-util) library, which relies on ES6 Proxies to observe state changes. Thanks to the Proxies it doesn't have edge cases or limitations. You can write any JS code without worrying about the render function. [This blog post](https://blog.risingstack.com/writing-a-javascript-framework-data-binding-es6-proxy/) gives a little sneak peek under the hood of the `observer-util`.

## Contributing

Contributions are always welcome. Just send a PR against the master branch or open a new issue. Please make sure that the tests and the linter pass and the coverage remains at 100%. Thx!

## The NX Framework

This library is a side effect of the front-end framework I have been working on in the past year. Please take a look at the [NX Framework](https://nx-framework.com/) if you have some time. Have a nice day!
