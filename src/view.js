import { Component } from 'react'
import { observe, unobserve } from '@nx-js/observer-util'

export default function view (Comp, { devtool: rawDevtool } = {}) {
  const isStatelessComp = !(Comp.prototype && Comp.prototype.isReactComponent)
  const BaseComp = isStatelessComp ? Component : Comp

  const devtool = rawDevtool
    ? operation => rawDevtool(Object.assign({ Component: Comp }, operation))
    : undefined

  // return a HOC which overwrites render, shouldComponentUpdate and componentWillUnmount
  // it decides when to run the new reactive methods and when to proxy to the original methods
  class ReactiveHOC extends BaseComp {
    constructor (props, context) {
      super(props, context)

      // create a reactive render for the component
      // run a dummy setState to schedule a new reactive render, avoid forceUpdate
      this.render = observe(this.render, {
        scheduler: () => this.setState({}),
        debugger: devtool,
        lazy: true
      })
    }

    render () {
      return isStatelessComp ? Comp(this.props, this.context) : super.render()
    }

    // react should trigger updates on prop changes, while easyState handles store changes
    shouldComponentUpdate (nextProps, nextState) {
      const { props, state } = this

      // respect the case when user prohibits updates
      if (
        super.shouldComponentUpdate &&
        !super.shouldComponentUpdate(nextProps, nextState)
      ) {
        devtool && devtool({ type: 'render', renderType: 'blocked' })
        return false
      }

      // return true if it is a reactive render or state changes
      if (state !== nextState) {
        devtool && devtool({ type: 'render', renderType: 'reactive' })
        return true
      }

      // the component should update if any of its props shallowly changed value
      const keys = Object.keys(props)
      const nextKeys = Object.keys(nextProps)
      if (
        nextKeys.length !== keys.length ||
        nextKeys.some(key => props[key] !== nextProps[key])
      ) {
        devtool &&
          devtool({
            type: 'render',
            renderType: 'normal',
            props: nextProps,
            oldProps: props
          })
        return true
      }
      return false
    }

    componentWillUnmount () {
      // call user defined componentWillUnmount
      if (super.componentWillUnmount) {
        super.componentWillUnmount()
      }
      // clean up memory used by Easy State
      unobserve(this.render)
    }
  }

  ReactiveHOC.displayName = Comp.displayName || Comp.name;
  // these are inherited by class components,
  // but have to be copied for function components
  if (isStatelessComp) {
    ReactiveHOC.contextTypes = Comp.contextTypes;
    ReactiveHOC.childContextTypes = Comp.childContextTypes;
    ReactiveHOC.propTypes = Comp.propTypes;
    ReactiveHOC.defaultProps = Comp.defaultProps;
  }

  return ReactiveHOC
}
