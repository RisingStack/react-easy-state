<p align="center">
  <img src="images/logo.svg" width="600px" height="auto" />
</p>

## React Easy State - by [RisingStack](https://risingstack.com/)

[![Build](https://img.shields.io/circleci/project/github/RisingStack/react-easy-state/master.svg)](https://circleci.com/gh/RisingStack/react-easy-state/tree/master) [![dependencies Status](https://david-dm.org/RisingStack/react-easy-state/status.svg)](https://david-dm.org/RisingStack/react-easy-state) [![Coverage Status](https://coveralls.io/repos/github/RisingStack/react-easy-state/badge.svg?branch=master&service=github)](https://coveralls.io/github/RisingStack/react-easy-state?branch=master) [![Package size](https://img.shields.io/bundlephobia/minzip/@risingstack/react-easy-state.svg)](https://bundlephobia.com/result?p=@risingstack/react-easy-state) [![Version](https://img.shields.io/npm/v/@risingstack/react-easy-state.svg)](https://www.npmjs.com/package/@risingstack/react-easy-state) [![License](https://img.shields.io/npm/l/@risingstack/react-easy-state.svg)](https://www.npmjs.com/package/@risingstack/react-easy-state) <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-blue.svg)](#contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<a href="#platform-support-computer"><img src="images/browser_support.png" alt="Browser support" width="450px" height="auto" /></a>

**NEWS:** v6.3.0 fixed a nasty bug that could render [zombie children](https://react-redux.js.org/api/hooks#stale-props-and-zombie-children). Please update to this version at least to save yourself some headaches. Thanks!

<details>
<summary><strong>Table of Contents</strong></summary>
<!-- Do not edit the Table of Contents, instead regenerate with `npm run build-toc` -->

<!-- toc -->

* [Introduction :wave:](#introduction-wave)
* [Installation :cd:](#installation-cd)
* [Everyday Usage :sunglasses:](#everyday-usage-sunglasses)
  + [Creating global stores](#creating-global-stores)
  + [Creating reactive views](#creating-reactive-views)
  + [Creating local stores](#creating-local-stores)
* [Advanced Usage :nerd_face:](#advanced-usage-nerd_face)
  + [Adding side effects](#adding-side-effects)
* [API Summary :book:](#api-summary-book)
  + [store(obj)](#storeobj)
  + [view(Comp)](#viewcomp)
  + [batch(fn)](#batchfn)
  + [autoEffect(fn)](#autoeffectfn)
  + [clearEffect(fn)](#cleareffectfn)
* [Examples with live demos :tv:](#examples-with-live-demos-tv)
* [Articles :loudspeaker:](#articles-loudspeaker)
* [Performance :rocket:](#performance-rocket)
* [Platform support :computer:](#platform-support-computer)
* [Contributors :sparkles:](#contributors-sparkles)

<!-- tocstop -->

</details>

## Introduction :wave:

React Easy State is a practical state management library with two functions and two accompanying rules.

1.  Always wrap your components with `view()`.
2.  Always wrap your state store objects with `store()`.

```jsx
import React from 'react';
import { store, view } from '@risingstack/react-easy-state';

const counter = store({
  num: 0,
  increment: () => counter.num++
});

export default view(() => (
  <button onClick={counter.increment}>{counter.num}</button>
));
```

This is enough for it to automatically update your views when needed. It doesn't matter how you structure or mutate your state stores, any syntactically valid code works.

Check this [TodoMVC codesandbox](https://codesandbox.io/s/github/RisingStack/react-easy-state/tree/master/examples/todo-mvc?module=%2Fsrc%2FtodosStore.js) or [raw code](/examples/todo-mvc/src/todosStore.js) for a more exciting example with nested data, arrays and getter properties.

## Installation :cd:

`npm install @risingstack/react-easy-state`

<details>
<summary><strong>Setting up a quick project</strong></summary>
<p></p>

Easy State supports <a href="https://github.com/facebookincubator/create-react-app">Create React App</a> without additional configuration. Just run the following commands to get started.

```sh
npx create-react-app my-app
cd my-app
npm install @risingstack/react-easy-state
npm start
```

_You need npm 5.2+ to use npx._

</details>

## Everyday Usage :sunglasses:

### Creating global stores

`store` creates a state store from the passed object and returns it. A state store behaves just like the passed object. (To be precise, it is a transparent reactive proxy of the original object.)

```js
import { store } from '@risingstack/react-easy-state';

const user = store({ name: 'Rick' });
// stores behave like normal JS objects
user.name = 'Bob';
```

<details>
<summary>State stores may have arbitrary structure and they may be mutated in any syntactically valid way.</summary>
<p></p>

```js
import { store } from '@risingstack/react-easy-state';

// stores can include any valid JS structure
// including nested data, arrays, Maps, Sets, getters, setters, inheritance, ...
const user = store({
  profile: {
    firstName: 'Bob',
    lastName: 'Smith',
    get name() {
      return `${user.profile.firstName} ${user.profile.lastName}`;
    },
  },
  hobbies: ['programming', 'sports'],
  friends: new Map(),
});

// stores may be mutated in any syntactically valid way
user.profile.firstName = 'Bob';
delete user.profile.lastName;
user.hobbies.push('reading');
user.friends.set('id', otherUser);
```

</details>
<p></p>

<details>
<summary>Async operations can be expressed with the standard async/await syntax.</summary>
<p></p>

```js
import { store } from '@risingstack/react-easy-state';

const userStore = store({
  user: {},
  async fetchUser() {
    userStore.user = await fetch('/user');
  },
});

export default userStore;
```

</details>
<p></p>

<details>
<summary>State stores may import and use other state stores in their methods.</summary>
<p></p>

_userStore.js_

```js
import { store } from '@risingstack/react-easy-state';

const userStore = store({
  user: {},
  async fetchUser() {
    userStore.user = await fetch('/user');
  },
});

export default userStore;
```

_recipesStore.js_

```js
import { store } from '@risingstack/react-easy-state';
import userStore from './userStore';

const recipesStore = store({
  recipes: [],
  async fetchRecipes() {
    recipesStore.recipes = await fetch(
      `/recipes?user=${userStore.user.id}`,
    );
  },
});

export default recipesStore;
```

</details>
<p></p>

<details>
<summary>Wrap your state stores with <code>store</code> as early as possible.</summary>
<p></p>

```js
// DON'T DO THIS
const person = { name: 'Bob' };
person.name = 'Ann';

export default store(person);
```

```js
// DO THIS INSTEAD
const person = store({ name: 'Bob' });
person.name = 'Ann';

export default person;
```

The first example wouldn't trigger re-renders on the `person.name = 'Ann'` mutation, because it is targeted at the raw object. Mutating the raw - none `store`-wrapped object - won't schedule renders.

</details>
<p></p>

<details>
<summary>Avoid using the <code>this</code> keyword in the methods of your state stores.</summary>
<p></p>

```jsx
import { store, view } from '@risingstack/react-easy-state';

const counter = store({
  num: 0,
  increment() {
    // DON'T DO THIS
    this.num++;
    // DO THIS INSTEAD
    counter.num++;
  },
});

export default view(() => (
  <div onClick={counter.increment}>{counter.num}</div>
));
```

`this.num++` won't work, because `increment` is passed as a callback and loses its `this`. You should use the direct object reference - `counter` - instead of `this`.

</details>

### Creating reactive views

Wrapping your components with `view` turns them into reactive views. A reactive view re-renders whenever a piece of store - used inside its render - changes.

```jsx
import React from 'react';
import { view, store } from '@risingstack/react-easy-state';

// this is a global state store
const user = store({ name: 'Bob' });

// this is re-rendered whenever user.name changes
export default view(() => (
  <div>
    <input
      value={user.name}
      onChange={ev => (user.name = ev.target.value)}
    />
    <div>Hello {user.name}!</div>
  </div>
));
```

<details>
<summary><strong>Wrap ALL of your components with <code>view</code> - including class and function ones - even if they don't seem to directly use a store.</strong></summary>
<p></p>

Every component that is using a store or part of a store inside its render must be wrapped with `view`. Sometimes store usage is not so explicit and easy to to miss.

```jsx
import { view, store } from '@risingstack/react-easy-state';

const appStore = store({
  user: { name: 'Ann' },
});

const App = view(() => (
  <div>
    <h1>My App</h1>
    <Profile user={appStore.user} />
  </div>
));

// DO THIS
const Profile = view(({ user }) => <p>Name: {user.name}</p>);

// DON'T DO THIS
// This won't re-render on appStore.user.name = 'newName' like mutations
const Profile = ({ user }) => <p>Name: {user.name}</p>;
```

If you are **100% sure** that your component is not using any stores you can skip the `view` wrapper.

```jsx
import React from 'react';

// you don't have to wrap this component with `view`
export default (() => <p>This is just plain text</p>);
```

`view` wrapping is advised even in these cases though.

- It saves you from future headaches as your project grows and you start to use stores inside these components.
- `view` is pretty much equivalent to `memo` if you don't use any stores. That is nearly always nice to have.

</details>
<p></p>

<details>
<summary>A single reactive component may use multiple stores inside its render.</summary>
<p></p>

```jsx
import React from 'react';
import { view, store } from '@risingstack/react-easy-state';

const user = store({ name: 'Bob' });
const timeline = store({ posts: ['react-easy-state'] });

// this is re-rendered whenever user.name or timeline.posts[0] changes
export default view(() => (
  <div>
    <div>Hello {user.name}!</div>
    <div>Your first post is: {timeline.posts[0]}</div>
  </div>
));
```

</details>
<p></p>

<details>
<summary><code>view</code> implements an optimal <code>shouldComponentUpdate</code> (or <code>memo</code>) for your components.</summary>
<p></p>

- Using `PureComponent` or `memo` will provide no additional performance benefits.

- Defining a custom `shouldComponentUpdate` may rarely provide performance benefits when you apply some use case specific heuristics inside it.

</details>
<p></p>

<details>
<summary>Reactive renders are batched. Multiple synchronous store mutations won't result in multiple re-renders of the same component.</summary>
<p></p>

```jsx
import React from 'react';
import { view, store } from '@risingstack/react-easy-state';

const user = store({ name: 'Bob', age: 30 });

function mutateUser() {
  user.name = 'Ann';
  user.age = 32;
}

// calling `mutateUser` will only trigger a single re-render of the below component
// even though it mutates the store two times in quick succession
export default view(() => (
  <div onClick={mutateUser}>
    name: {user.name}, age: {user.age}
  </div>
));
```

If you mutate your stores multiple times synchronously from **exotic task sources**, multiple renders may rarely happen. If you experience performance issues you can batch changes manually with the `batch` function. `batch(fn)` executes the passed function immediately and batches any subsequent re-renders until the function execution finishes.

```jsx
import React from 'react';
import { view, store, batch } from '@risingstack/react-easy-state';

const user = store({ name: 'Bob', age: 30 });

function mutateUser() {
  // this makes sure the state changes will cause maximum one re-render,
  // no matter where this function is getting invoked from
  batch(() => {
    user.name = 'Ann';
    user.age = 32;
  });
}

export default view(() => (
  <div>
    name: {user.name}, age: {user.age}
  </div>
));
```

> **NOTE:** The React team plans to improve render batching in the future. The `batch` function and built-in batching may be deprecated and removed in the future in favor of React's own batching.

</details>
<p></p>

<details>
<summary>Always apply <code>view</code> as the latest (innermost) wrapper when you combine it with other Higher Order Components.</summary>
<p></p>

```jsx
import { view } from '@risingstack/react-easy-state';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'styled-components';

const Comp = () => <div>A reactive component</div>;

// DO THIS
withRouter(view(Comp));
withTheme(view(Comp));

// DON'T DO THIS
view(withRouter(Comp));
view(withTheme(Comp));
```

</details>
<p></p>

<details>
<summary>Usage with (pre v4.4) React Router.</summary>
<p></p>

- If routing is not updated properly, wrap your `view(Comp)` - with the `Route`s inside - in `withRouter(view(Comp))`. This lets react-router know when to update.

- The order of the HOCs matter, always use `withRouter(view(Comp))`.

This is not necessary if you use React Router 4.4+.

</details>
<p></p>

<details>
<summary>Usage with React Developer Tools.</summary>
<p></p>

If you want React Developer Tools to recognize your reactive view components' names, you have to pass either a **named function** or an anonymous function with **name inference** to the `view` wrapper.

```jsx
import React from 'react';
import { view, store } from '@risingstack/react-easy-state';

const user = store({
  name: 'Rick',
});

const componentName = () => (
  <div>{user.name}</div>
);

export default view(componentName);
```

</details>
<p></p>

<details>
<summary>Passing nested data to third party components.</summary>
<p></p>

Third party helpers - like data grids - may consist of many internal components which can not be wrapped by `view`, but sometimes you would like them to re-render when the passed data mutates. Traditional React components re-render when their props change by reference, so mutating the passed reactive data won't work in these cases. You can solve this issue by deep cloning the observable data before passing it to the component. This creates a new reference for the consuming component on every store mutation.

```jsx
import React from 'react';
import { view, store } from '@risingstack/react-easy-state';
import Table from 'rc-table';
import cloneDeep from 'lodash/cloneDeep';

const dataStore = store({
  items: [
    {
      product: 'Car',
      value: 12,
    },
  ],
});

export default view(() => (
  <Table data={cloneDeep(dataStore.items)} />
));
```

</details>

### Creating local stores

A singleton global store is perfect for something like the current user, but sometimes having local component states is a better fit. Just create a store inside a function component or as a class component property in these cases.

#### Local stores in function components

```jsx
import React from 'react'
import { view, store } from '@risingstack/react-easy-state'

export default view(() => {
  const counter = store({ num: 0 })
  const increment = () => counter.num++
  return <button={increment}>{counter.num}</button>
})
```

**Local stores in functions rely on React hooks. They require React and React DOM v16.8+ or React Native v0.59+ to work.**

<details>
<summary>You can use React hooks - including <code>useState</code> - in function components, Easy State won't interfere with them. Consider using <a href="#local-auto-effects-in-function-components">autoEffect</a> instead of the <code>useEffect</code> hook for the best experience though.</summary>
<p></p>

```jsx
import React from 'react';
import { view, store } from '@risingstack/react-easy-state';

export default view(() => {
  const [name, setName] = useState('Ann');
  const user = store({ age: 30 });
  return (
    <div>
      <input value={name} onChange={ev => setName(ev.target.value)} />
      <input
        value={user.age}
        onChange={ev => (user.age = ev.target.value)}
      />
    </div>
  );
});
```

</details>

#### Local stores in class components

```jsx
import React, { Component } from 'react';
import { view, store } from '@risingstack/react-easy-state';

class Counter extends Component {
  counter = store({ num: 0 });
  increment = () => counter.num++;

  render() {
    return (
      <button onClick={this.increment}>{this.counter.num}</button>
    );
  }
}

export default view(Counter);
```

<details>
<summary>You can also use vanilla <code>setState</code> in your class components, Easy State won't interfere with it.</summary>
<p></p>

```jsx
import React, { Component } from 'react';
import { view, store } from '@risingstack/react-easy-state';

class Profile extends Component {
  state = { name: 'Ann' };
  user = store({ age: 30 });

  setName = ev => this.setState({ name: ev.target.value });
  setAge = ev => (this.user.age = ev.target.value);

  render() {
    return (
      <div>
        <input value={this.state.name} onChange={this.setName} />
        <input value={this.user.age} onChange={this.setAge} />
      </div>
    );
  }
}

export default view(Profile);
```

</details>
<p></p>

<details>
<summary>Don't name local stores as <code>state</code>. It may conflict with linter rules, which guard against direct state mutations.</summary>
<p></p>

```jsx
import React, { Component } from 'react';
import { view, store } from '@risingstack/react-easy-state';

class Profile extends Component {
  // DON'T DO THIS
  state = store({});
  // DO THIS
  user = store({});
  render() {}
}
```

</details>
<p></p>

<details>
<summary>Deriving local stores from props (<code>getDerivedStateFromProps</code>).</summary>
<p></p>

Class components wrapped with `view` have an extra static `deriveStoresFromProps` lifecycle method, which works similarly to the vanilla `getDerivedStateFromProps`.

```jsx
import React, { Component } from 'react';
import { view, store } from '@risingstack/react-easy-state';

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

Instead of returning an object, you should directly mutate the received stores. If you have multiple local stores on a single component, they are all passed as arguments - in their definition order - after the first props argument.

</details>

## Advanced Usage :nerd_face:

### Adding side effects

Use `autoEffect` to react with automatic side effect to your store changes. Auto effects should contain end-of-chain logic - like changing the document title or saving data to LocalStorage. `view` is a special auto effect that does rendering.

<details>
<summary>Never use auto effects to derive data from other data. Use dynamic getters instead.</summary>
<p></p>

```jsx
import { store, autoEffect } from '@risingstack/react-easy-state';

// DON'T DO THIS
const store1 = store({ name: 'Store 1' })
const store2 = store({ name: 'Store 2' })
autoEffect(() => store2.name = store1.name)

// DO THIS INSTEAD
const store1 = store({ name: 'Store 1' })
const store2 = store({ get name () { return store1.name } })
```

</details>
<p></p>

#### Global auto effects

Global auto effects can be created with `autoEffect` and cleared up with `clearEffect`.

```jsx
import { store, autoEffect, clearEffect } from '@risingstack/react-easy-state';

const app = store({ name: 'My App' })
const effect = autoEffect(() => document.title = app.name)

// this also updates the document title
app.name = 'My Awesome App'

clearEffect(effect)
// this won't update the document title, the effect is cleared
app.name = 'My App'
```

#### Local auto effects in function components

Use local auto effects in function components instead of the `useEffect` hook when reactive stores are used inside them. These local effects are automatically cleared when the component unmounts.

```jsx
import React from 'react'
import { store, view, autoEffect } from '@risingstack/react-easy-state';

export default view(() => {
  const app = store({ name: 'My App' })
  // no need to clear the effect
  autoEffect(() => document.title = app.name)
})
```

<details>
<summary>Explicitly pass none reactive dependencies - like vanillas props and state - to local auto effects in function components.</summary>
<p></p>

Because of the design of React hooks you have to explicitly pass all none reactive data to a hook-like dependency array. This makes sure that the effect also runs when the none reactive data changes.

```jsx
import React from 'react'
import { store, view, autoEffect } from '@risingstack/react-easy-state';

export default view(({ greeting }) => {
  const app = store({ name: 'My App' })
  // pass `greeting` in the dependency array because it is not coming from a store
  autoEffect(() => document.title = `${greeting} ${app.name}`, [greeting])
})
```

</details>
<p></p>

#### Local auto effects in class components

Local effects in class components must be cleared when the component unmounts.

```jsx
import React, { Component } from 'react'
import { store, view, autoEffect } from '@risingstack/react-easy-state';

class App extends Component {
  app = store({ name: 'My App' })

  componentDidMount () {
    this.effect = autoEffect(() => document.title = this.app.name)
  }

  componentWillUnmount () {
    // local effects in class components must be cleared on unmount
    clearEffect(this.effect)
  }
}
```

## API Summary :book:

### store(obj)

Creates an observable store from the passed object and returns it. Can be used outside components for [global stores](#creating-global-stores) and inside components for [local stores](#creating-local-stores).

```js
import { store } from '@risingstack/react-easy-state';

const user = store({ name: 'Rick' });
```

### view(Comp)

Creates a [reactive view](#creating-reactive-views) from the passed component and returns it. A reactive view re-renders whenever any store data used inside it is mutated.

```jsx
import React from 'react';
import { view, store } from '@risingstack/react-easy-state';

const user = store({ name: 'Bob' });

export default view(() => (
  <div>Hello {user.name}!</div>
));
```

### batch(fn)

Immediately executes the passed function and batches all store mutations inside it. Batched mutations are guaranteed to not trigger unnecessary double renders. Most task sources are batched automatically, only  use `batch` if you encounter performance issues.

```jsx
import React from 'react';
import { view, store } from '@risingstack/react-easy-state';

const user = store({ name: 'Bob' });

function setName() {
  batch(() => {
    user.name = 'Rick'
    user.name = 'Ann'
  })
}
```

### autoEffect(fn)

Creates a reactive function from the passed one, immediately executes it, and returns it. A reactive function automatically re-reruns whenever any store data used inside it is mutated.

Can be used both [outside](#global-auto-effects) and [inside](#local-auto-effects-in-function-components) components.

```js
import { store, autoEffect } from '@risingstack/react-easy-state';

const user = store({ name: 'Bob' })

autoEffect(() => document.title = user.name)
```

### clearEffect(fn)

Takes a reactive function (returned by `autoEffect`) and clears the reactivity from it. Cleared reactive functions will no longer re-rerun on related store mutations. Reactive functions created inside function components are automatically cleared when the component unmounts.

```js
import { store, autoEffect, clearEffect } from '@risingstack/react-easy-state';

const user = store({ name: 'Bob' })

const effect = autoEffect(() => document.title = user.name)
clearEffect(effect)
```

## Examples with live demos :tv:

#### Beginner

- [Clock Widget](https://risingstack.github.io/react-easy-state/examples/clock/build) ([source](/examples/clock/)) ([codesandbox](https://codesandbox.io/s/github/RisingStack/react-easy-state/tree/master/examples/clock)) ([react-native source](/examples/native-clock/)) ([react-native sandbox](https://snack.expo.io/@git/github.com/RisingStack/react-easy-state:examples/native-clock)): a reusable clock widget with a tiny local state store.
- [Stopwatch](https://risingstack.github.io/react-easy-state/examples/stop-watch/build) ([source](/examples/stop-watch/)) ([codesandbox](https://codesandbox.io/s/github/RisingStack/react-easy-state/tree/master/examples/stop-watch)) ([tutorial](https://hackernoon.com/introducing-react-easy-state-1210a156fa16)): a stopwatch with a mix of normal and getter state properties.

#### Advanced

- [Pokédex](https://risingstack.github.io/react-easy-state/examples/pokedex/build) ([source](/examples/pokedex/)) ([codesandbox](https://codesandbox.io/s/github/RisingStack/react-easy-state/tree/master/examples/pokedex)): a Pokédex app build with Apollo GraphQL, async actions and a global state.
- [TodoMVC](https://risingstack.github.io/react-easy-state/examples/todo-mvc/build) ([source](/examples/todo-mvc/)) ([codesandbox](https://codesandbox.io/s/github/RisingStack/react-easy-state/tree/master/examples/todo-mvc)): a classic TodoMVC implementation with a lot of getters/setters and implicit reactivity.
- [Contacts Table](https://risingstack.github.io/react-easy-state/examples/contacts/build) ([source](/examples/contacts/)) ([codesandbox](https://codesandbox.io/s/github/RisingStack/react-easy-state/tree/master/examples/contacts)): a data grid implementation with a mix of global and local state.
- [Beer Finder](https://risingstack.github.io/react-easy-state/examples/beer-finder/build) ([source](/examples/beer-finder/)) ([codesandbox](https://codesandbox.io/s/github/RisingStack/react-easy-state/tree/master/examples/beer-finder)) ([tutorial](https://medium.com/@solkimicreb/design-patterns-with-react-easy-state-830b927acc7c)): an app with async actions and a mix of local and global state, which finds matching beers for your meal.

## Articles :loudspeaker:

- [Introducing React Easy State](https://blog.risingstack.com/introducing-react-easy-state/): making a simple stopwatch.
- [Stress Testing React Easy State](https://medium.com/@solkimicreb/stress-testing-react-easy-state-ac321fa3becf): demonstrating Easy State's reactivity with increasingly exotic state mutations.
- [Design Patterns with React Easy State](https://medium.com/@solkimicreb/design-patterns-with-react-easy-state-830b927acc7c): demonstrating async actions and local and global state management through a beer finder app.
- [The Ideas Behind React Easy State](https://medium.com/dailyjs/the-ideas-behind-react-easy-state-901d70e4d03e): a deep dive under the hood of Easy State.

## Performance :rocket:

You can compare Easy State with plain React and other state management libraries with the below benchmarks. It performs a bit better than MobX and similarly to Redux.

- [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark) ([source](https://github.com/krausest/js-framework-benchmark/tree/master/frameworks/keyed/react-easy-state/src)) ([results](https://rawgit.com/krausest/js-framework-benchmark/master/webdriver-ts-results/table.html))

## Platform support :computer:

- Node: 6 and above
- Chrome: 49 and above
- Firefox: 38 and above
- Safari: 10 and above
- Edge: 12 and above
- Opera: 36 and above
- React Native: 0.59 and above

_This library is based on non polyfillable ES6 Proxies. Because of this, it will never support IE._

## Contributors :sparkles:

Contributions are always welcome, please read our [contributing documentation](CONTRIBUTING.md).

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://bertalan-miklos.now.sh/"><img src="https://avatars3.githubusercontent.com/u/6956014?v=4" width="100px;" alt=""/><br /><sub><b>Miklos Bertalan</b></sub></a><br /><a href="https://github.com/RisingStack/react-easy-state/commits?author=solkimicreb" title="Code">💻</a> <a href="https://github.com/RisingStack/react-easy-state/commits?author=solkimicreb" title="Tests">⚠️</a> <a href="https://github.com/RisingStack/react-easy-state/commits?author=solkimicreb" title="Documentation">📖</a> <a href="#blog-solkimicreb" title="Blogposts">📝</a></td>
    <td align="center"><a href="https://github.com/rolandszoke"><img src="https://avatars3.githubusercontent.com/u/14181908?v=4" width="100px;" alt=""/><br /><sub><b>Roland</b></sub></a><br /><a href="https://github.com/RisingStack/react-easy-state/commits?author=rolandszoke" title="Code">💻</a> <a href="https://github.com/RisingStack/react-easy-state/commits?author=rolandszoke" title="Tests">⚠️</a> <a href="https://github.com/RisingStack/react-easy-state/commits?author=rolandszoke" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/dnlgrgly"><img src="https://avatars3.githubusercontent.com/u/22714514?s=460&u=cbbc2326d5f671693a1f33671d9eadad902d5191&v=4" width="100px;" alt=""/><br /><sub><b>Daniel Gergely</b></sub></a><br /><a href="https://github.com/RisingStack/react-easy-state/commits?author=danielgrgly" title="Code">💻</a> <a href="#design-danielgrgly" title="Design">🎨</a> <a href="#example-danielgrgly" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/peteyycz"><img src="https://avatars1.githubusercontent.com/u/7130689?v=4" width="100px;" alt=""/><br /><sub><b>Peter Czibik</b></sub></a><br /><a href="#infra-peteyycz" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
