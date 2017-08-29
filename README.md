# React Easy State

[![Build](https://img.shields.io/circleci/project/github/solkimicreb/react-easy-state/master.svg)](https://circleci.com/gh/solkimicreb/react-easy-state/tree/master) [![Coverage Status](https://coveralls.io/repos/github/solkimicreb/react-easy-state/badge.svg)](https://coveralls.io/github/solkimicreb/react-easy-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Package size](http://img.badgesize.io/https://unpkg.com/react-easy-state/dist/esm.es6.min.js?compression=gzip&label=minzip_size)](https://unpkg.com/react-easy-state/dist/esm.es6.js)  [![Version](https://img.shields.io/npm/v/react-easy-state.svg)](https://www.npmjs.com/package/react-easy-state) [![dependencies Status](https://david-dm.org/solkimicreb/react-easy-state/status.svg)](https://david-dm.org/solkimicreb/react-easy-state) [![License](https://img.shields.io/npm/l/react-easy-state.svg)](https://www.npmjs.com/package/react-easy-state)

*Easy State provides a healthy balance of local and global state management in a simple, scalable way.*

## Table of contents

- [Installation](#installation)  
- [Usage](#usage)
- [Examples](#examples-with-live-demos)
- [Platform support](#platform-support)
- [Performance](#performance)
- [State management overview](#state-management-overview)
- [How does it work?](#how-does-it-work)
- [Contributing](#contributing)
- [The NX Framework](#the-nx-framework)

## Installation

`npm install react-easy-state`

### Setting up a quick project

Easy State supports [Create React App](https://github.com/facebookincubator/create-react-app) without additional configuration. Just run the following commands to get started.

- `npm install -g create-react-app`
- `create-react-app my-app`
- `cd my-app`
- `npm install react-easy-state --save`
- `npm start`

## Usage

Easy State consists of two functions:

- `easyComp` makes component level state management simpler.
- `easyStore` creates global state stores for complex apps.

### easyComp

Wrapping your components with the `easyComp` function provides the following benefits.

- It adds a local `store` to the component, which can be handled as a simple JS object.

- It binds your component's methods to the component.

```js
import React, { Component } from 'react'
import { easyComp } from 'react-easy-state'

class Hello extends Component {
  store = {
    name: 'World'
  }

  // this is bound to the component, so it can be safely passed as a callback
  onChange (ev) {
    // the store can be modified directly
    this.store.name = ev.target.value  
  }

  // the render is triggered whenever store.name changes
  render () {
    const { onChange } = this
    const { name } = this.store

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

**Make sure to wrap all of your components with `easyComp` - including stateful and stateless ones - before you export them.**

In addition to the boilerplate reduction, `easyComp` comes with a bunch of additional benefits that may not be obvious at first glance.

- The store is simple object. You don't have to worry about immutable state updates or the asynchronous nature of `setState`. If you are not sure about the meaning of this check out [this article](https://medium.freecodecamp.org/functional-setstate-is-the-future-of-react-374f30401b6b) about `setState`.

- The render method is only triggered if it is affected by store mutations. If it doesn't use the mutated part of the store or the mutation doesn't change the store, the render method is not triggered.

- The render method is never executed immediately. Triggered renders are collected and executed asynchronously in one batch.

- Renders always run before the next repaint.

- Duplicates renders are removed. A render never runs twice in one batch - no matter how many times it got triggered.

- Renders may trigger others renders by mutating the store. In this case loops are automatically resolved.

- Easy State implements an optimal `shouldComponentUpdate` for your components.

As a result the store is always fresh and a stable and a fresh view is always achieved before the next repaint with the minimal number of required renders.

### easyStore

`easyStore` creates global state stores, to handle data that does not fit into component stores. Wrapping an object with `easyStore` has to following effects.

- It transforms the object into a reactive data store, which triggers appropriate renders on mutations. This store is just a simple object.

- It binds your store's methods to the store.

```js
import React from 'react'
import { easyComp, easyStore } from 'react-easy-state'

// this creates a global state store
const store = easyStore({
  name: 'World',
  // this is bound to the object, so it can be safely passed as a callback
  setName (ev) {
    this.name = ev.target.value
  }
})

// the render is triggered whenever store.name changes
function Hello () {
  const { name, setName } = store

  return (
    <div>
      <input value={name} onChange={setName} />
      <div>Hello {name}!</div>
    </div>
  )
}

// the component must be wrapped with easyComp
export default easyComp(Hello)
```

**Make sure to wrap your component with `easyComp` even if it uses global stores only and no local stores.**

- Global stores are simple objects and there is no limitation on what you can do with them. As an example feel free to use expando properties, arrays, deeply nested objects, ES6 collections or getters/setters in your stores.

- Render methods are only triggered if they are affected by the store mutations. If they don't use the mutated part of the store or the mutation doesn't change the store, the render method is not triggered.

- Render methods are never executed immediately. Triggered renders are collected and executed asynchronously in one batch.

- Renders always run before the next repaint.

- Duplicates renders are removed. A render never runs twice in one batch - no matter how many times it got triggered.

- Renders may trigger others renders by mutating the store again. In this case loops are automatically resolved.

As a result the stores are always fresh and a stable and a fresh view is always achieved before the next repaint with the minimal number of required renders.

## Examples with live demos

- [Clock Widget](https://solkimicreb.github.io/react-easy-state/examples/clock/dist) ([source](/examples/clock/))
- [TodoMVC](https://solkimicreb.github.io/react-easy-state/examples/todoMVC/dist) ([source](/examples/todoMVC/))
- [Contacts Table](https://solkimicreb.github.io/react-easy-state/examples/contacts/dist) ([source](/examples/contacts/))

## Platform support

- Node: 6 and above
- Chrome: 49 and above
- Firefox: 38 and above
- Safari: 10 and above
- Edge: 12 and above
- Opera: 36 and above
- React native is not yet supported
- IE is not supported

## Performance

You can compare Easy State with plain React and other state management libraries with the below benchmarks. Easy State performs a bit better than MobX, a bit worse than plain optimized React and similarly to Redux.

- [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark) ([source](https://github.com/krausest/js-framework-benchmark/tree/master/react-v15.5.4-easy-state-v1.0.3)) ([results](https://rawgit.com/krausest/js-framework-benchmark/master/webdriver-ts-results/table.html))

The list of benchmarks will expand in the future.

## State management overview

Finding the right balance between local component stores and global state stores is not always a trivial task. This section gives you some general guide lines when to use which.

### Reusable widgets

This is an easy decision. Always use local component stores for reusable components. Depending on global stores would interfere with their reusability and break them. Check out the introductory [clock example](/examples/clock/) for some code.

### Application state

Application state should usually be managed in global stores. It is singleton and its is usually persistent while the app is open. You can find a few candidates for global storage below.

- The currently logged in user is a good example. There is only one user at a time and user data should be easily available anywhere anytime. It is a perfect candidate for a singleton global store.

- User inputs, which should go into the URL or change the browser history are also great examples. These are inherently global because they affect global concepts - like the URL and browser history. Some example for these are filters, date ranges and sorting primitives.

Not everything fits in global stores though. You can find a few cases below when using the local component store makes more sense then global stores.

- Utility and meta data should go into component stores. For example you may have a component which handles recent history for an input field. It may make sense to receive the data for the input from a global store and manage the history meta data in the local store. Check out the [contacts table example](/examples/contacts/) for some code.

### Application pages

Application pages deserve a special mention. A typical app has several pages but, only one of them is active at a time. This makes them a nice candidate for singleton global state stores. However pages are not as persistent as the app's user for example, which makes them lean towards local state management.

Page state usually has properties, which belong in the URL and browser history. In this case it is inherently global and it should be handled in a global store. These stores persist between page transitions, but this is perfectly fine. As a bonus you get a faster transition, because you don't always have to re-fetch all of the data. If you do not want data to linger around clean up the relevant parts in `componentWillUnmount`.

## How does it work?

Under the hood Easy State uses the [@nx-js/observer-util](https://github.com/nx-js/observer-util) library, which relies on ES6 Proxies to observe state changes. Thanks to the Proxies it doesn't have edge cases or limitations. You can write any JS code without worrying about the render function. [This blog post](https://blog.risingstack.com/writing-a-javascript-framework-data-binding-es6-proxy/) gives a little sneak peek under the hood of the `observer-util`.

## Contributing

Contributions are always welcome. Just send a PR against the master branch or open a new issue. Please make sure that the tests and the linter pass and the coverage remains decent. Thanks!

## The NX Framework

This library is a side project of the front-end framework I have been working on in the past year. Please take a look at the [NX Framework](https://nx-framework.com/) if you have some time. Thanks and have a nice day!
