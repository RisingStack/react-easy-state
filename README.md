# React Easy State

Easy State a tiny state management solution for React with a strong focus on simplicity.

## Installation

`npm i react-easy-state --save`

## Usage

Easy State consists of two functions: `easyComp` and `easyStore`.

### easyComp

Wrapping your components with the `easyComp` function simplifies React's own state management in the following ways.

- It allows you to mutate the component's state directly, without calling `setState`.

- It binds your component's methods to the component, to allow them to be passed as callbacks.

```js
import React, { Component } from 'react'
import { easyComp } from 'react-easy-state'

class Hello extends Component {
  state = {
    name: 'World!'
  }

  // this is bound to the component, so it can be safely passed as a callback
  onChange (ev) {
    // the state can be modified directly
    this.state.name = ev.target.value  
  }

  // the render is triggered whenever state.name changes
  render () {
    const { onChange } = this
    const { name } = this.state

    return (
      <div>
        <input value={name} onChange={onChange} />
        <div>Hello {name}!</div>
      </div>
    )
  }
}

// the component must be wrapped with easyComp
export default easyComp(Hello)
```

Apart from the simplified syntax wrapping your component's with `EasyComp` provides the following benefits.

- The state is just an object, which updates synchronously when you update it. You don't have to worry about the asynchronous nature of `setState`.

- State mutations are picked up and they trigger the render method when appropriate.

- The render method is only triggered if it is affected by state mutations. If it doesn't use the mutated part of the state or the mutation doesn't change the state, the render method is not triggered.

- The render method is never executed immediately. Triggered renders are collected and executed asynchronously in one batch.

- Duplicates renders are removed. A render never runs twice in one batch - no matter how many times it got triggered. Renders run in first trigger order.

- Renders may trigger others renders by mutating the state. In this case loops are automatically resolved.

- Renders always run before the next repaint.

- Easy State implements an optimal `shouldComponentUpdate` for your components, so you don't have to worry about doing it by hand.

As a result the state is always fresh and a stable and fresh view is always achieved before the next repaint with the minimal number of required renders.

### easyStore

`EasyStore` creates global state stores, to handle data that do not fit into component state. Wrapping an object with `easyStore` has to following effects.

- It transforms the object into a reactive data store, which triggers appropriate renders on mutations.

- It binds your object's methods to the object, to allow them to be passed as callbacks.

```js
import React, { Component } from 'react'
import { easyComp, easyStore } from 'react-easy-state'

// this creates a global state store
const store = easyStore({
  name: 'Hello'
})

class Hello extends Component {
  // this is bound to the component, so it can be safely passed as a callback
  onChange (ev) {
    store.name = ev.target.value  
  }

  // the render is triggered whenever store.name changes
  render () {
    return (
      <div>
        <input value={store.name} onChange={this.onChange} />
        <div>Hello {store.name}!</div>
      </div>
    )
  }
}

// the component must be wrapped with easyComp
export default easyComp(Hello)
```

`easyStore` creates global state stores. A store is just an object and it behaves much like the component state from `easyComp`. It can be handled like a normal JavaScript object and it automatically triggers the appropriate render methods when it is mutated.

## State management tutorial

Easy State promotes a healthy balance between local and global state. The following use cases will give a rough guide when to use which.

### Widgets and libraries

This is an easy decision. Always use local component state for reusable components. They should be robust and versatile without implicit dependencies. Check out the introductory [clock example]() for some code.

### Application state

Most application state is usually persistent and singleton. It should be managed in global stores.

- A good example is the currently logged in user. There is only one user at a time and user data should be easily available anywhere anytime. Perfect candidate for singleton global state.

- Another nice example is user inputs, which should go into the URL or change the browser history. These are inherently global because they affect global concepts (URL and browser history). Some example for these are filters, date ranges and sorting primitives.


### Application pages

A typical app has several independent pages. There is only one active page at a time, which makes them a nice candidate for singleton global state stores. However pages are not as persistent as the app user for example, which makes them lean towards local state management.

Page state usually has filters and inputs, which goes into the URL and browser history. In this case it is inherently global and it should be handled in a global state store. These stores persist between page transitions, but this is perfectly fine. As a bonus you get a faster transition, because you don't always have to re-fetch all of the data. If you do not want data to linger around clean up the relevant parts in `componentWillUnmount`.

## Examples with live demos

- [Clock Widget](https://solkimicreb.github.io/react-easy-state/examples/clock/) ([source](/examples/clock/))
- [TodoMVC](https://solkimicreb.github.io/react-easy-state/examples/todoMVC/) ([source](/examples/todoMVC/))
- [Contacts Table](https://solkimicreb.github.io/react-easy-state/examples/contacts/) ([source](/examples/contacts/))

## Performance

You can compare Easy State with plain React and other state management libraries with the below benchmarks. Easy State performs a bit better than MobX, a bit worse than plain optimized React and similarly to Redux.

- [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark) ([source](https://github.com/krausest/js-framework-benchmark/tree/master/react-v15.5.4-easy-state-v1.0.3)) ([results](https://rawgit.com/krausest/js-framework-benchmark/master/webdriver-ts-results/table.html))

The list of benchmarks will expand in the future.

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
