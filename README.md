# React Easy State

React state management with a minimal API. Made with :heart: and ES6 Proxies.

[![Build](https://img.shields.io/circleci/project/github/solkimicreb/react-easy-state/master.svg)](https://circleci.com/gh/solkimicreb/react-easy-state/tree/master) [![Coverage Status](https://coveralls.io/repos/github/solkimicreb/react-easy-state/badge.svg)](https://coveralls.io/github/solkimicreb/react-easy-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Package size](http://img.badgesize.io/https://unpkg.com/react-easy-state/dist/umd.es6.min.js?compression=gzip&label=minzip_size)](https://unpkg.com/react-easy-state/dist/umd.es6.min.js)  [![Version](https://img.shields.io/npm/v/react-easy-state.svg)](https://www.npmjs.com/package/react-easy-state) [![dependencies Status](https://david-dm.org/solkimicreb/react-easy-state/status.svg)](https://david-dm.org/solkimicreb/react-easy-state) [![License](https://img.shields.io/npm/l/react-easy-state.svg)](https://www.npmjs.com/package/react-easy-state)

<details>
<summary><strong>Table of Contents</strong></summary>
<!-- Do not edit the Table of Contents, instead regenerate with `npm run build-toc` -->

<!-- toc -->

* [Motivation](#motivation)
* [Installation](#installation)
  + [Setting up a quick project](#setting-up-a-quick-project)
* [Usage](#usage)
  + [Creating stores](#creating-stores)
  + [Creating reactive views](#creating-reactive-views)
  + [Creating local stores](#creating-local-stores)
  + [What triggers a re-render?](#what-triggers-a-re-render)
  + [When do renders run?](#when-do-renders-run)
* [Examples with live demos](#examples-with-live-demos)
* [Platform support](#platform-support)
* [Performance](#performance)
* [How does it work?](#how-does-it-work)
* [Alternative builds](#alternative-builds)
* [Contributing](#contributing)

<!-- tocstop -->

</details>

## Introduction

Easy State consists of two wrapper functions only. `store` creates state stores and `view` creates reactive components, which re-render whenever state stores are mutated. The rest is just plain JavaScript.

```js
import React, from 'react'
import { store, view } from 'react-easy-state'

const clock = store({ time: new Date() })
setInterval(() => clock.time = new Date(), 1000)

function ClockComp () {
  return <div>{clock.time}</div>
}

export default view(ClockComp)
```

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

*You need npm 5.2+ to use npx*
</details>

## Usage

Easy State consists of two functions:

- `store` turns your objects into observable state stores.
- `view` makes your components reactive. Reactive components re-render when stores are mutated.

### Creating stores

`store` creates a state store from the passed object and returns it. State stores are just like normal JS objects. (To be precise, they are transparent proxies of the original object.)

```js
import { store } from 'react-easy-state'

const user = store({
  name: 'Rick'
})

// stores behave like normal JS objects
user.name = 'Bob'
```

*Store methods are automatically bound to the store to make passing them as callbacks easier.*

### Creating reactive views

Wrapping your components with `view` turns them into reactive views. A reactive view re-renders whenever a store - used inside its render - changes.

```js
import React, { Component } from 'react'
import { view, store } from 'react-easy-state'

const user = store({
  name: 'Bob'
})

class HelloComp extends Component {
  onChange (ev) {
    user.name = ev.target.value  
  }

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

*View methods are automatically bound to the component to make passing them as callbacks easier.*

### Creating local stores

A singleton global store is perfect for something like the current user, but sometimes having local component states is better. Just create a store as a component property in these cases.

```js
import React, { Component } from 'react'
import { view, store } from 'react-easy-state'

class ClockComp extends Component {
  clock = store({
    time: new Date()
  })

  componentDidMount () {
    setInterval(() => this.clock.time = new Date(), 1000)
  }

  // the render is triggered whenever this.clock.time changes
  render () {
    return <div>{this.clock.time}</div>
  }
}

// the component must be wrapped with `view`
export default view(ClockComp)
```

That's it! You know everything to master React state management.

### What triggers a re-render?

Easy State monitors which store properties are used inside each component's render method. If a store property changes, the relevant renders are automatically triggered. You can do **anything** with stores without worrying about edge cases. Use nested properties, expando properties, arrays, ES6 collections or getters/setters - as a few examples. Easy State will monitor their mutations and trigger renders when needed. (Big cheer for [ES6 Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)!)

### When do renders run?

Triggered renders are passed to React for execution, there is no `forceUpdate` behind the scenes. This means that component lifecycle hooks behave as expected and that React Fiber works nicely together with Easy State. On top of this, you can use your favorite testing frameworks without any added hassle.

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

## How does it work?

Under the hood Easy State uses the [@nx-js/observer-util](https://github.com/nx-js/observer-util) library, which relies on [ES6 Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to observe state changes. Thanks to the Proxies it doesn't have edge cases. You can write any JS code without worrying about your render functions. [This blog post](https://blog.risingstack.com/writing-a-javascript-framework-data-binding-es6-proxy/) gives a little sneak peek under the hood of the `observer-util`.

## Alternative builds

This library detects if you use ES6 or commonJS modules and serve the right format to you. The exposed bundles are transpiled to ES5 to support common tools - like UglifyJS minifying. If you would like a finer control over the provided build, you can specify them in your imports.

- `react-easy-state/dist/es.es6.js` exposes an ES6 build with ES6 modules.
- `react-easy-state/dist/es.es5.js` exposes an ES5 build with ES6 modules.
- `react-easy-state/dist/cjs.es6.js` exposes an ES6 build with commonJS modules.
- `react-easy-state/dist/cjs.es5.js` exposes an ES5 build with commonJS modules.

If you use a bundler, set up an alias for `react-easy-state` to point to your desired build. You can learn how to do it with webpack [here](https://webpack.js.org/configuration/resolve/#resolve-alias) and with rollup [here](https://github.com/rollup/rollup-plugin-alias#usage).

## Contributing

Contributions are always welcome. Just send a PR against the master branch or open a new issue. Please make sure that the tests and the linter pass and the coverage remains decent. Thanks!
