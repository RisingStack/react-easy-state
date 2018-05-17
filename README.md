# React Easy State

Simple React state management. Made with :heart: and ES6 Proxies.

[![Build](https://img.shields.io/circleci/project/github/solkimicreb/react-easy-state/master.svg)](https://circleci.com/gh/solkimicreb/react-easy-state/tree/master) [![Coverage Status](https://coveralls.io/repos/github/solkimicreb/react-easy-state/badge.svg)](https://coveralls.io/github/solkimicreb/react-easy-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Package size](http://img.badgesize.io/https://unpkg.com/react-easy-state/dist/umd.es6.min.js?compression=gzip&label=minzip_size)](https://unpkg.com/react-easy-state/dist/umd.es6.min.js) [![Version](https://img.shields.io/npm/v/react-easy-state.svg)](https://www.npmjs.com/package/react-easy-state) [![dependencies Status](https://david-dm.org/solkimicreb/react-easy-state/status.svg)](https://david-dm.org/solkimicreb/react-easy-state) [![License](https://img.shields.io/npm/l/react-easy-state.svg)](https://www.npmjs.com/package/react-easy-state)

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
  + [My component renders multiple times unnecessarily](#my-component-renders-multiple-times-unnecessarily)
  + [How do I derive local stores from props (getDerivedStateFromProps)?](#how-do-i-derive-local-stores-from-props-getderivedstatefromprops)
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

1.  Always wrap your components with `view`.
2.  Always wrap your state store objects with `store`.

```js
import React from 'react';
import { store, view } from 'react-easy-state';

const clock = store({ time: new Date() });
setInterval(() => (clock.time = new Date()), 1000);

export default view(() => <div>{clock.time.toString()}</div>);
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

_You need npm 5.2+ to use npx._

</details>

## Usage

### Creating stores

`store` creates a state store from the passed object and returns it. State stores are just like normal JS objects. (To be precise, they are transparent reactive proxies of the original object.)

```js
import { store } from 'react-easy-state';

const user = store({
  name: 'Rick'
});

// stores behave like normal JS objects
user.name = 'Bob';
```

### Creating reactive views

Wrapping your components with `view` turns them into reactive views. A reactive view re-renders whenever a store's property - used inside its render - changes.

```js
import React, { Component } from 'react';
import { view, store } from 'react-easy-state';

const user = store({ name: 'Bob' });

class HelloComp extends Component {
  onChange = ev => (user.name = ev.target.value);

  // the render is triggered whenever user.name changes
  render() {
    return (
      <div>
        <input value={user.name} onChange={this.onChange} />
        <div>Hello {user.name}!</div>
      </div>
    );
  }
}

// the component must be wrapped with `view`
export default view(HelloComp);
```

**Make sure to wrap all of your components with `view` - including stateful and stateless ones. If you do not wrap a component, it will not properly render on store mutations.**

<details>
<summary><strong>Usage as a decorator</strong></summary>

`view` can also be used as a class decorator with the `@view` syntax. You can learn more about decorators [here](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841).

```js
import React, { Component } from 'react';
import { view, store } from 'react-easy-state';

const user = store({
  name: 'Bob'
});

@view
class HelloComp extends Component {
  onChange = ev => (user.name = ev.target.value);

  // the render is triggered whenever user.name changes
  render() {
    return (
      <div>
        <input value={user.name} onChange={this.onChange} />
        <div>Hello {user.name}!</div>
      </div>
    );
  }
}
```

_Decorators are not a standardized JavaScript feature and create-react-app does not support them yet._

</details>

### Creating local stores

A singleton global store is perfect for something like the current user, but sometimes having local component states is a better fit. Just create a store as a component property in these cases.

```js
import React, { Component } from 'react';
import { view, store } from 'react-easy-state';

class ClockComp extends Component {
  clock = store({ time: new Date() });

  componentDidMount() {
    setInterval(() => (this.clock.time = new Date()), 1000);
  }

  render() {
    return <div>{this.clock.time}</div>;
  }
}

export default view(ClockComp);
```

That's it, You know everything to master React state management! Check some of the [examples](#examples-with-live-demos) and [articles](#articles) for more inspiration or the [FAQ section](#faq-and-gotchas) for common issues.

## Examples with live demos

_Beginner_

* [Clock Widget](https://solkimicreb.github.io/react-easy-state/examples/clock/build) ([source](/examples/clock/)) ([codesandbox](https://codesandbox.io/s/github/solkimicreb/react-easy-state/tree/master/examples/clock)): a reusable clock widget with a tiny local state store.
* [Stopwatch](https://solkimicreb.github.io/react-easy-state/examples/stop-watch/build) ([source](/examples/stop-watch/)) ([codesandbox](https://codesandbox.io/s/github/solkimicreb/react-easy-state/tree/master/examples/stop-watch)) ([tutorial](https://hackernoon.com/introducing-react-easy-state-1210a156fa16)): a stopwatch with a mix of normal and computed state properties.

_Advanced_

* [TodoMVC](https://solkimicreb.github.io/react-easy-state/examples/todo-mvc/build) ([source](/examples/todo-mvc/)) ([codesandbox](https://codesandbox.io/s/github/solkimicreb/react-easy-state/tree/master/examples/todo-mvc)): a classic TodoMVC implementation with a lot of computed data and implicit reactivity.
* [Contacts Table](https://solkimicreb.github.io/react-easy-state/examples/contacts/build) ([source](/examples/contacts/)) ([codesandbox](https://codesandbox.io/s/github/solkimicreb/react-easy-state/tree/master/examples/contacts)): a data grid implementation with a mix of global and local state.
* [Beer Finder](https://solkimicreb.github.io/react-easy-state/examples/beer-finder/build) ([source](/examples/beer-finder/)) ([codesandbox](https://codesandbox.io/s/github/solkimicreb/react-easy-state/tree/master/examples/beer-finder)) ([tutorial](https://medium.com/@solkimicreb/design-patterns-with-react-easy-state-830b927acc7c)): an app with async actions and a mix of local and global state, which finds matching beers for your meal.

## Articles

* [Introducing React Easy State](https://blog.risingstack.com/introducing-react-easy-state/): making a simple stopwatch.
* [Stress Testing React Easy State](https://medium.com/@solkimicreb/stress-testing-react-easy-state-ac321fa3becf): demonstrating Easy State's reactivity with increasingly exotic state mutations.
* [Design Patterns with React Easy State](https://medium.com/@solkimicreb/design-patterns-with-react-easy-state-830b927acc7c): demonstrating async actions and local and global state management through a beer finder app.
* [The Ideas Behind React Easy State](https://medium.com/dailyjs/the-ideas-behind-react-easy-state-901d70e4d03e): a deep dive under the hood of Easy State.

## FAQ and Gotchas

### What triggers a re-render?

Easy State monitors which store properties are used inside each component's render method. If a store property changes, the relevant renders are automatically triggered. You can do **anything** with stores without worrying about edge cases. Use nested properties, computed properties with getters/setters, dynamic properties, arrays, ES6 collections and prototypal inheritance - as a few examples. Easy State will monitor all state mutations and trigger renders when needed. (Big cheer for [ES6 Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)!)

### When do renders run?

Triggered renders are passed to React for execution, there is no `forceUpdate` behind the scenes. This means that component lifecycle hooks behave as expected and that React Fiber works nicely together with Easy State. On top of this, you can use your favorite testing frameworks without any added hassle.

### My component renders multiple times unnecessarily

If you mutate your stores inside React event handlers, this will never happen.

If you mutate your stores multiple times synchronously from outside event handlers, it can happen though. You can wrap the mutating code with `ReactDOM.flushSync` to batch the updates and trigger a single re-render only. (It works similarly to MobX's actions.)

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { view, store } from 'react-easy-state';

const user = store({ name: 'Bob', age: 30 });

function mutateUser() {
  user.name = 'Ann';
  user.age = 32;
}

// this renders the component 2 times
mutateUser();
// this renders the component only once, after all the mutations
ReactDOM.flushSync(mutateUser);

// clicking on the inner div renders the component only once,
// because mutateUser is invoked as an event handler
export default view(() => (
  <div onClick={mutateUser}>
    name: {user.name}, age: {user.age}
  </div>
));
```

This will not be necessary once React's new scheduler is ready. It currently batches `setState` calls inside event handlers only, but this will change soon.

> We realize it's inconvenient that the behavior is different depending on whether you're in an event handler or not. This will change in a future React version that will batch all updates by default (and provide an opt-in API to flush changes synchronously). Until we switch the default behavior (potentially in React 17), there is an API you can use to force batching.

You can find the whole post by Dan Abramov [here](https://stackoverflow.com/a/48610973). Once the new default React scheduler is ready, you won't have to worry about multiple renders. Until then you can use `ReactDOM.flushSync` or just let it go, if you do not experience performance issues.

### How do I derive local stores from props (getDerivedStateFromProps)?

Components wrapped with `view` have an extra static `deriveStoresFromProps` lifecycle method, which works similarly to the vanilla `getDerivedStateFromProps`.

```js
import React, { Component } from 'react';
import { view, store } from 'react-easy-state';

class NameCard extends Component {
  userStore = store({ name: 'Bob' });

  static deriveStoresFromProps(props, userStore) {
    userStore.name = props.name || userStore.name;
  }

  render() {
    return <div>{this.userStore.name}</div>;
  }
}

export default view(NameCard);
```

Instead of returning an object, you should directly mutate the passed in stores. If you have multiple local stores on a single component, they are all passed as arguments - in their definition order - after the first props argument.

### My store methods are broken

You should not use the `this` keyword in the methods of your state stores.

```js
const counter = store({
  num: 0,
  increment() {
    this.num++;
  }
});

export default view(() => <div onClick={counter.increment}>{counter.num}</div>);
```

The above snippet won't work, because `increment` is passed as a callback and loses its `this`. You should use the direct object reference - `counter` in this case - instead of `this`.

```js
const counter = store({
  num: 0,
  increment() {
    counter.num++;
  }
});
```

This works as expected, even when you pass store methods as callbacks.

### My views are not rendering

You should wrap your state stores with `store` as early as possible to make them reactive.

```js
const person = { name: 'Bob' };
person.name = 'Ann';

export default store(person);
```

The above example wouldn't trigger re-renders on the `person.name = 'Ann'` mutation, because it is targeted at the raw object. Mutating the raw - none `store` wrapped object - won't schedule renders.

Do this instead of the above code.

```js
const person = store({ name: 'Bob' });
person.name = 'Ann';

export default person;
```

### Naming local stores as state

Naming your local state stores as `state` may conflict with React linter rules, which guard against direct state mutations. Please use a more descriptive name instead.

## Platform support

* Node: 6 and above
* Chrome: 49 and above
* Firefox: 38 and above
* Safari: 10 and above
* Edge: 12 and above
* Opera: 36 and above
* React Native: iOS 10 and above and Android with [community JSC](https://github.com/SoftwareMansion/jsc-android-buildscripts)
* IE is not supported and never will be

_This library is based on non polyfillable ES6 Proxies. Because of this, it will never support IE._

_React Native is supported on iOS and Android is supported with the community JavaScriptCore. Learn how to set it up [here](https://github.com/SoftwareMansion/jsc-android-buildscripts#how-to-use-it-with-my-react-native-app). It is pretty simple._

## Performance

You can compare Easy State with plain React and other state management libraries with the below benchmarks. It performs a bit better than MobX and a bit worse than Redux.

* [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark) ([source](https://github.com/krausest/js-framework-benchmark/tree/master/react-v16.1.0-easy-state-v4.0.1-keyed)) ([results](https://rawgit.com/krausest/js-framework-benchmark/master/webdriver-ts-results/table.html))

## How does it work?

Under the hood Easy State uses the [@nx-js/observer-util](https://github.com/nx-js/observer-util) library, which relies on [ES6 Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to observe state changes. [This blog post](https://blog.risingstack.com/writing-a-javascript-framework-data-binding-es6-proxy/) gives a little sneak peek under the hood of the `observer-util`.

## Alternative builds

This library detects if you use ES6 or commonJS modules and serve the right format to you. The exposed bundles are transpiled to ES5 to support common tools - like UglifyJS minifying. If you would like a finer control over the provided build, you can specify them in your imports.

* `react-easy-state/dist/es.es6.js` exposes an ES6 build with ES6 modules.
* `react-easy-state/dist/es.es5.js` exposes an ES5 build with ES6 modules.
* `react-easy-state/dist/cjs.es6.js` exposes an ES6 build with commonJS modules.
* `react-easy-state/dist/cjs.es5.js` exposes an ES5 build with commonJS modules.

If you use a bundler, set up an alias for `react-easy-state` to point to your desired build. You can learn how to do it with webpack [here](https://webpack.js.org/configuration/resolve/#resolve-alias) and with rollup [here](https://github.com/rollup/rollup-plugin-alias#usage).

## Contributing

Contributions are always welcome. Just send a PR against the master branch or open a new issue. Please make sure that the tests and the linter pass and the coverage remains decent. Thanks!
