# React Easy State

Simple React state management. Made with :heart: and ES6 Proxies.

[![Build](https://img.shields.io/circleci/project/github/solkimicreb/react-easy-state/master.svg)](https://circleci.com/gh/solkimicreb/react-easy-state/tree/master) [![Coverage Status](https://coveralls.io/repos/github/solkimicreb/react-easy-state/badge.svg)](https://coveralls.io/github/solkimicreb/react-easy-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Package size](http://img.badgesize.io/https://unpkg.com/react-easy-state/dist/umd.es6.min.js?compression=gzip&label=minzip_size)](https://unpkg.com/react-easy-state/dist/umd.es6.min.js)  [![Version](https://img.shields.io/npm/v/react-easy-state.svg)](https://www.npmjs.com/package/react-easy-state) [![dependencies Status](https://david-dm.org/solkimicreb/react-easy-state/status.svg)](https://david-dm.org/solkimicreb/react-easy-state) [![License](https://img.shields.io/npm/l/react-easy-state.svg)](https://www.npmjs.com/package/react-easy-state)

<a href="#platform-support"><img src="images/browser_support.png" alt="Browser support" width="450px" /></a>

**Breaking change in [v5](https://github.com/solkimicreb/react-easy-state/releases/tag/v5.0.0)**: the auto bind feature got removed. See the alternatives for your components at the [official React docs](https://reactjs.org/docs/handling-events.html) and for you stores at [the FAQ docs section](#my-store-methods-are-broken).

<details>
<summary><strong>Table of Contents</strong></summary>
<!-- Do not edit the Table of Contents, instead regenerate with `npm run build-toc` -->

<!-- toc -->

* [Introduction](#introduction)
* [Installation](#installation)
* [Usage](#usage)
  + [Creating stores](#creating-stores)
  + [Creating reactive views](#creating-reactive-views)
  + [Creating local stores](#creating-local-stores)
* [Examples with live demos](#examples-with-live-demos)
* [Articles](#articles)
* [FAQ and Gotchas](#faq-and-gotchas)
  + [What triggers a re-render?](#what-triggers-a-re-render)
  + [When do renders run?](#when-do-renders-run)
  + [My store methods are broken](#my-store-methods-are-broken)
  + [My views are not rendering](#my-views-are-not-rendering)
  + [Naming local stores as state](#naming-local-stores-as-state)
* [Platform support](#platform-support)
* [Performance](#performance)
* [How does it work?](#how-does-it-work)
* [Alternative builds](#alternative-builds)
* [Contributing](#contributing)

<!-- tocstop -->

</details>

## Introduction

Easy State has two rules.

1. Always wrap you components with `view`.
2. Always wrap you state store objects with `store`.

```js
import React from 'react'
import { store, view } from 'react-easy-state'

const clock = store({ time: new Date() })
setInterval(() => clock.time = new Date(), 1000)

export default view(() => <div>{clock.time}</div>)
```

This is enough for it to automatically update your views when needed - no matter how exotically you mutate your state stores. With this freedom you can invent and use your personal favorite state management patterns.

## Installation

`npm install react-easy-state`


<details>
<summary><strong>Setting up a quick project</strong></summary>

Easy State supports [Create React App](https://github.com/facebookincubator/create-react-app) without additional configuration. Just run the following commands to get started.

```sh
npx create-react-app my-app
cd my-app
npm install react-easy-state
npm start
```

*You need npm 5.2+ to use npx.*
</details>

## Usage

### Creating stores

`store` creates a state store from the passed object and returns it. State stores are just like normal JS objects. (To be precise, they are transparent reactive proxies of the original object.)

```js
import { store } from 'react-easy-state'

const user = store({
  name: 'Rick'
})

// stores behave like normal JS objects
user.name = 'Bob'
```

### Creating reactive views

Wrapping your components with `view` turns them into reactive views. A reactive view re-renders whenever a store's property - used inside its render - changes.

```js
import React, { Component } from 'react'
import { view, store } from 'react-easy-state'

const user = store({ name: 'Bob' })

class HelloComp extends Component {
  onChange = (ev) => (user.name = ev.target.value)

  // the render is triggered whenever user.name changes
  render () {
    return (
      <div>
        <input value={user.name} onChange={this.onChange} />
        <div>Hello {user.name}!</div>
      </div>
    )
  }
}

// the component must be wrapped with `view`
export default view(HelloComp)
```

**Make sure to wrap all of your components with `view` - including stateful and stateless ones. If you do not wrap a component, it will not properly render on store mutations.**

<details>
<summary><strong>Usage as a decorator</strong></summary>

`view` can also be used as a class decorator with the `@view` syntax. You can learn more about decorators [here](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841).

```js
import React, { Component } from 'react'
import { view, store } from 'react-easy-state'

const user = store({
  name: 'Bob'
})

@view
class HelloComp extends Component {
  onChange = (ev) => (user.name = ev.target.value)

  // the render is triggered whenever user.name changes
  render () {
    return (
      <div>
        <input value={user.name} onChange={this.onChange} />
        <div>Hello {user.name}!</div>
      </div>
    )
  }
}
```

*Decorators are not a standardized JavaScript feature and create-react-app does not support them yet.*
</details>

### Creating local stores

A singleton global store is perfect for something like the current user, but sometimes having local component states is a better fit. Just create a store as a component property in these cases.

```js
import React, { Component } from 'react'
import { view, store } from 'react-easy-state'

class ClockComp extends Component {
  clock = store({ time: new Date() })

  componentDidMount () {
    setInterval(() => this.clock.time = new Date(), 1000)
  }

  render () {
    return <div>{this.clock.time}</div>
  }
}

export default view(ClockComp)
```

That's it, You know everything to master React state management! Check some of the [examples](#examples-with-live-demos) and [articles](#articles) for more inspiration or the [FAQ section](#faq-and-gotchas) for common issues.

## Examples with live demos

*Beginner*

- [Clock Widget](https://solkimicreb.github.io/react-easy-state/examples/clock/dist) ([source](/examples/clock/)): a reusable clock widget with a tiny local state store.
- [Stopwatch](https://solkimicreb.github.io/react-easy-state/examples/stopWatch/dist) ([source](/examples/stopWatch/)) ([tutorial](https://hackernoon.com/introducing-react-easy-state-1210a156fa16)): a stopwatch with a mix of normal and computed state properties.

*Advanced*

- [TodoMVC](https://solkimicreb.github.io/react-easy-state/examples/todoMVC/dist) ([source](/examples/todoMVC/)): a classic TodoMVC implementation with a lot of computed data and implicit reactivity.
- [Contacts Table](https://solkimicreb.github.io/react-easy-state/examples/contacts/dist) ([source](/examples/contacts/)): a data grid implementation with a mix of global and local state.
- [Beer Finder](https://solkimicreb.github.io/react-easy-state/examples/beerFinder/dist) ([source](/examples/beerFinder/))([tutorial](https://medium.com/@solkimicreb/design-patterns-with-react-easy-state-830b927acc7c)): an app with async actions and a mix of local and global state, which finds matching beers for your meal.

## Articles

- [Introducing React Easy State](https://blog.risingstack.com/introducing-react-easy-state/): making a simple stopwatch.
- [Stress Testing React Easy State](https://medium.com/@solkimicreb/stress-testing-react-easy-state-ac321fa3becf): demonstrating Easy State's reactivity with increasingly exotic state mutations.
- [Design Patterns with React Easy State](https://medium.com/@solkimicreb/design-patterns-with-react-easy-state-830b927acc7c): demonstrating async actions and local and global state management through a beer finder app.
- [The Ideas Behind React Easy State](https://medium.com/dailyjs/the-ideas-behind-react-easy-state-901d70e4d03e): a deep dive under the hood of Easy State.

## FAQ and Gotchas

### What triggers a re-render?

Easy State monitors which store properties are used inside each component's render method. If a store property changes, the relevant renders are automatically triggered. You can do **anything** with stores without worrying about edge cases. Use nested properties, computed properties with getters/setters, dynamic properties, arrays, ES6 collections and prototypal inheritance - as a few examples. Easy State will monitor all state mutations and trigger renders when needed. (Big cheer for [ES6 Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)!)

### When do renders run?

Triggered renders are passed to React for execution, there is no `forceUpdate` behind the scenes. This means that component lifecycle hooks behave as expected and that React Fiber works nicely together with Easy State. On top of this, you can use your favorite testing frameworks without any added hassle.

### My store methods are broken

You should not use the `this` keyword in the methods of your state stores.

```js
const counter = store({
  num: 0,
  increment () {
    this.num++
  }
})

export default view(() =>
  <div onClick={counter.increment}>{counter.num}</div>
)
```

The above snippet won't work, because `increment` is passed as a callback and looses its `this`. You should use the direct object reference - `counter` in this case - instead of `this`.

```js
const counter = store({
  num: 0,
  increment () {
    counter.num++
  }
})
```

This works as expected, even when you pass store methods as callbacks.

### My views are not rendering

You should wrap your state stores with `store` as early as possible to make them reactive.

```js
const person = { name: 'Bob' }
person.name = 'Ann'

export default store(person)
```

The above example wouldn't trigger re-renders on the `person.name = 'Ann'` mutation, because it is targeted at the raw object. Mutating the raw - none `store` wrapped object - won't schedule renders.

Do this instead of the above code.

```js
const person = store({ name: 'Bob' })
person.name = 'Ann'

export default person
```

### Naming local stores as state

Naming your local state stores as `state` may conflict with React linter rules, which guard against direct state mutations. Please use a more descriptive name instead.

## Platform support

- Node: 6 and above
- Chrome: 49 and above
- Firefox: 38 and above
- Safari: 10 and above
- Edge: 12 and above
- Opera: 36 and above
- React Native: iOS 10 and above and Android with [community JSC](https://github.com/SoftwareMansion/jsc-android-buildscripts)
- IE is not supported and never will be

*This library is based on non polyfillable ES6 Proxies. Because of this, it will never support IE.*

*React Native is supported on iOS and Android is supported with the community JavaScriptCore. Learn how to set it up [here](https://github.com/SoftwareMansion/jsc-android-buildscripts#how-to-use-it-with-my-react-native-app). It is pretty simple.*

## Performance

You can compare Easy State with plain React and other state management libraries with the below benchmarks. It performs a bit better than MobX and a bit worse than Redux.

- [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark) ([source](https://github.com/krausest/js-framework-benchmark/tree/master/react-v16.1.0-easy-state-v4.0.1-keyed)) ([results](https://rawgit.com/krausest/js-framework-benchmark/master/webdriver-ts-results/table.html))

## How does it work?

Under the hood Easy State uses the [@nx-js/observer-util](https://github.com/nx-js/observer-util) library, which relies on [ES6 Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to observe state changes. [This blog post](https://blog.risingstack.com/writing-a-javascript-framework-data-binding-es6-proxy/) gives a little sneak peek under the hood of the `observer-util`.

## Alternative builds

This library detects if you use ES6 or commonJS modules and serve the right format to you. The exposed bundles are transpiled to ES5 to support common tools - like UglifyJS minifying. If you would like a finer control over the provided build, you can specify them in your imports.

- `react-easy-state/dist/es.es6.js` exposes an ES6 build with ES6 modules.
- `react-easy-state/dist/es.es5.js` exposes an ES5 build with ES6 modules.
- `react-easy-state/dist/cjs.es6.js` exposes an ES6 build with commonJS modules.
- `react-easy-state/dist/cjs.es5.js` exposes an ES5 build with commonJS modules.

If you use a bundler, set up an alias for `react-easy-state` to point to your desired build. You can learn how to do it with webpack [here](https://webpack.js.org/configuration/resolve/#resolve-alias) and with rollup [here](https://github.com/rollup/rollup-plugin-alias#usage).

## Contributing

Contributions are always welcome. Just send a PR against the master branch or open a new issue. Please make sure that the tests and the linter pass and the coverage remains decent. Thanks!
