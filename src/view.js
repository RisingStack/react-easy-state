import { Component, useState, useEffect, useMemo, memo } from 'react'
import { observe, unobserve, raw, isObservable } from '@nx-js/observer-util'
import { hasHooks } from './utils'

export let isInsideFunctionComponent = false
const COMPONENT = Symbol('owner component')
const DUMMY_STATE = {}
let priority = 0

export default function view(Comp) {
  const isStatelessComp = !(Comp.prototype && Comp.prototype.isReactComponent)

  let ReactiveComp

  if (isStatelessComp && hasHooks) {
    // use a hook based reactive wrapper when we can
    ReactiveComp = memo(props => {
      // create a memoized reactive wrapper of the original component (render)
      // at the very first run of the component function
      const render = useMemo(() => {
        const [, setState] = useState()

        return observe(Comp, {
          scheduler: () => setState(DUMMY_STATE),
          lazy: true
        })
      }, [])

      // cleanup the reactive connections after the very last render of the component
      useEffect(() => {
        return () => unobserve(render)
      }, [])

      // the isInsideFunctionComponent flag is used to toggle `store` behavior
      // based on where it was called from
      isInsideFunctionComponent = true
      try {
        // run the reactive render instead of the original one
        return render(props)
      } finally {
        isInsideFunctionComponent = false
      }
    })
  } else {
    const BaseComp = isStatelessComp ? Component : Comp
    // a HOC which overwrites render, shouldComponentUpdate and componentWillUnmount
    // it decides when to run the new reactive methods and when to proxy to the original methods
    class ReactiveClassComp extends BaseComp {
      constructor(props, context) {
        super(props, context)

        this.state = this.state || {}
        this.state[COMPONENT] = this

        // create a reactive render for the component
        this.render = observe(this.render, {
          scheduler: () => this.setState(DUMMY_STATE),
          lazy: true
        })
      }

      render() {
        return isStatelessComp ? Comp(this.props, this.context) : super.render()
      }

      // react should trigger updates on prop changes, while easyState handles store changes
      shouldComponentUpdate(nextProps, nextState) {
        const { props, state } = this

        // respect the case when the user defines a shouldComponentUpdate
        if (super.shouldComponentUpdate) {
          return super.shouldComponentUpdate(nextProps, nextState)
        }

        // return true if it is a reactive render or state changes
        if (state !== nextState) {
          return true
        }

        // the component should update if any of its props shallowly changed value
        const keys = Object.keys(props)
        const nextKeys = Object.keys(nextProps)
        return (
          nextKeys.length !== keys.length ||
          nextKeys.some(key => props[key] !== nextProps[key])
        )
      }

      // add a custom deriveStoresFromProps lifecyle method
      static getDerivedStateFromProps(props, state) {
        if (super.deriveStoresFromProps) {
          // inject all local stores and let the user mutate them directly
          const stores = mapStateToStores(state)
          super.deriveStoresFromProps(props, ...stores)
        }
        // respect user defined getDerivedStateFromProps
        if (super.getDerivedStateFromProps) {
          return super.getDerivedStateFromProps(props, state)
        }
        return null
      }

      componentWillUnmount() {
        // call user defined componentWillUnmount
        if (super.componentWillUnmount) {
          super.componentWillUnmount()
        }
        // clean up memory used by Easy State
        unobserve(this.render)
      }
    }

    ReactiveComp = ReactiveClassComp
  }

  ReactiveComp.displayName = Comp.displayName || Comp.name
  // static props are inherited by class components,
  // but have to be copied for function components
  if (isStatelessComp) {
    for (let key of Object.keys(Comp)) {
      ReactiveComp[key] = Comp[key]
    }
  }

  return ReactiveComp
}

function mapStateToStores(state) {
  // find store properties and map them to their none observable raw value
  // to do not trigger none static this.setState calls
  // from the static getDerivedStateFromProps lifecycle method
  const component = state[COMPONENT]
  return Object.keys(component)
    .map(key => component[key])
    .filter(isObservable)
    .map(raw)
}
