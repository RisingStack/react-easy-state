/* eslint camelcase: 0 */

import { Component, useState, useEffect, useMemo, memo } from 'react';
// eslint-disable-next-line import/no-unresolved
import { unstable_batchedUpdates } from 'react-platform';
import {
  observe,
  unobserve,
  raw,
  isObservable,
} from '@nx-js/observer-util';

import { globalObj, hasHooks } from './utils';

export let isInsideFunctionComponent = false;
export let isInsideClassComponentRender = false;
export let isInsideFunctionComponentWithoutHooks = false;
const COMPONENT = Symbol('owner component');

function mapStateToStores(state) {
  // find store properties and map them to their none observable raw value
  // to do not trigger none static this.setState calls
  // from the static getDerivedStateFromProps lifecycle method
  const component = state[COMPONENT];
  return Object.keys(component)
    .map(key => component[key])
    .filter(isObservable)
    .map(raw);
}

// We batch all updates to the view until the end of the current task. This
// is to prevent excessive rendering in situations where updates can occur
// outside of React's built-in batching. e.g. after resolving a promise,
// in a setTimeout callback, in an event handler.
//
// NOTE: This should be revisited after React improves batching for
// Suspense / etc.
let batchesPending = {};
let taskPending = false;
let viewIndexCounter = 0;
let inEventLoop = false;

function batchSetState(viewIndex, fn) {
  if (inEventLoop) {
    // If we are in the main event loop, React handles the batching
    // automatically, so we run the change immediately. Deferring the
    // update can cause unexpected cursor shifts in input elements,
    // since the change can't be tied back to the action:
    // https://github.com/facebook/react/issues/5386
    fn();
    return;
  }

  batchesPending[viewIndex] = fn;
  if (!taskPending) {
    taskPending = true;
    queueMicrotask(() => {
      const batchesToRun = batchesPending;
      taskPending = false;
      batchesPending = {};
      unstable_batchedUpdates(() =>
        Object.values(batchesToRun).forEach(setStateFn =>
          setStateFn(),
        ),
      );
    });
  }
}

// No need to trigger an update for this view since it has been removed.
function clearBatch(viewIndex) {
  delete batchesPending[viewIndex];
}

// this creates and returns a wrapped version of the passed function
// the cache is necessary to always map the same thing to the same function
// which makes sure that addEventListener/removeEventListener pairs don't break
const cache = new WeakMap();
function wrapFn(fn, wrapper) {
  if (typeof fn !== 'function') {
    return fn;
  }
  let wrapped = cache.get(fn);
  if (!wrapped) {
    wrapped = function(...args) {
      return wrapper(fn, this, args);
    };
    cache.set(fn, wrapped);
  }
  return wrapped;
}

function wrapMethodCallbacks(obj, method, wrapper) {
  const descriptor = Object.getOwnPropertyDescriptor(obj, method);
  if (
    descriptor &&
    descriptor.writable &&
    typeof descriptor.value === 'function'
  ) {
    obj[method] = new Proxy(descriptor.value, {
      apply(target, ctx, args) {
        return Reflect.apply(
          target,
          ctx,
          args.map(f => wrapFn(f, wrapper)),
        );
      },
    });
  }
}

// wrapped obj.addEventListener(cb) like callbacks
function wrapMethodsCallbacks(obj, methods, wrapper) {
  methods.forEach(method =>
    wrapMethodCallbacks(obj, method, wrapper),
  );
}

// batch addEventListener calls
if (globalObj.EventTarget) {
  wrapMethodsCallbacks(
    EventTarget.prototype,
    ['addEventListener', 'removeEventListener'],
    (fn, ctx, args) => {
      inEventLoop = true;
      try {
        fn.apply(ctx, args);
      } finally {
        inEventLoop = false;
      }
    },
  );
}

export function view(Comp) {
  const isStatelessComp = !(
    Comp.prototype && Comp.prototype.isReactComponent
  );

  let ReactiveComp;

  if (isStatelessComp && hasHooks) {
    // use a hook based reactive wrapper when we can
    ReactiveComp = props => {
      // Unique ID for each view instance.
      viewIndexCounter += 1;
      const viewIndex = viewIndexCounter;
      // use a dummy setState to update the component
      const [, setState] = useState();
      // create a memoized reactive wrapper of the original component (render)
      // at the very first run of the component function
      const render = useMemo(
        () =>
          observe(Comp, {
            scheduler: () =>
              batchSetState(viewIndex, () => {
                setState({});
              }),
            lazy: true,
          }),
        // Adding the original Comp here is necessary to make React Hot Reload work
        // it does not affect behavior otherwise
        [Comp],
      );

      // cleanup the reactive connections after the very last render of the component
      useEffect(() => {
        return () => {
          // We don't need to trigger a render after the component is removed.
          clearBatch(viewIndex);
          unobserve(render);
        };
      }, []);

      // the isInsideFunctionComponent flag is used to toggle `store` behavior
      // based on where it was called from
      isInsideFunctionComponent = true;
      try {
        // run the reactive render instead of the original one
        return render(props);
      } finally {
        isInsideFunctionComponent = false;
      }
    };
  } else {
    const BaseComp = isStatelessComp ? Component : Comp;
    // a HOC which overwrites render, shouldComponentUpdate and componentWillUnmount
    // it decides when to run the new reactive methods and when to proxy to the original methods
    class ReactiveClassComp extends BaseComp {
      constructor(props, context) {
        super(props, context);

        // Unique ID for each class insance.
        viewIndexCounter += 1;
        this.viewIndex = viewIndexCounter;
        this.state = this.state || {};
        this.state[COMPONENT] = this;

        // create a reactive render for the component
        this.render = observe(this.render, {
          scheduler: () =>
            batchSetState(this.viewIndex, () => this.setState({})),
          lazy: true,
        });
      }

      render() {
        isInsideClassComponentRender = !isStatelessComp;
        isInsideFunctionComponentWithoutHooks = isStatelessComp;
        try {
          return isStatelessComp
            ? Comp(this.props, this.context)
            : super.render();
        } finally {
          isInsideClassComponentRender = false;
          isInsideFunctionComponentWithoutHooks = false;
        }
      }

      // react should trigger updates on prop changes, while easyState handles store changes
      shouldComponentUpdate(nextProps, nextState) {
        const { props, state } = this;

        // respect the case when the user defines a shouldComponentUpdate
        if (super.shouldComponentUpdate) {
          return super.shouldComponentUpdate(nextProps, nextState);
        }

        // return true if it is a reactive render or state changes
        if (state !== nextState) {
          return true;
        }

        // the component should update if any of its props shallowly changed value
        const keys = Object.keys(props);
        const nextKeys = Object.keys(nextProps);
        return (
          nextKeys.length !== keys.length ||
          nextKeys.some(key => props[key] !== nextProps[key])
        );
      }

      // add a custom deriveStoresFromProps lifecyle method
      static getDerivedStateFromProps(props, state) {
        if (super.deriveStoresFromProps) {
          // inject all local stores and let the user mutate them directly
          const stores = mapStateToStores(state);
          super.deriveStoresFromProps(props, ...stores);
        }
        // respect user defined getDerivedStateFromProps
        if (super.getDerivedStateFromProps) {
          return super.getDerivedStateFromProps(props, state);
        }
        return null;
      }

      componentWillUnmount() {
        // call user defined componentWillUnmount
        if (super.componentWillUnmount) {
          super.componentWillUnmount();
        }
        // We don't need to trigger a render.
        clearBatch(this.viewIndex);
        // clean up memory used by Easy State
        unobserve(this.render);
      }
    }

    ReactiveComp = ReactiveClassComp;
  }

  ReactiveComp.displayName = Comp.displayName || Comp.name;
  // static props are inherited by class components,
  // but have to be copied for function components
  if (isStatelessComp) {
    Object.keys(Comp).forEach(key => {
      ReactiveComp[key] = Comp[key];
    });
  }

  return isStatelessComp && hasHooks
    ? memo(ReactiveComp)
    : ReactiveComp;
}
