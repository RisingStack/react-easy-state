import { Component } from 'react'
import { observe, unobserve } from '@nx-js/observer-util'

export default function view (Comp) {
  const isStatelessComp = !(Comp.prototype && Comp.prototype.isReactComponent)
  const BaseComp = isStatelessComp ? Component : Comp

  const rawDevtool =
    typeof __REACT_EASY_STATE_DEVTOOL__ === 'function' &&
    __REACT_EASY_STATE_DEVTOOL__

  const devtool = rawDevtool
    ? operation => rawDevtool(Object.assign({ Component: Comp }, operation))
    : undefined

  // return a HOC which overwrites render, shouldComponentUpdate and componentWillUnmount
  // it decides when to run the new reactive methods and when to proxy to the original methods
  return class ReactiveHOC extends BaseComp {
    static displayName = Comp.displayName || Comp.name;
    static contextTypes = Comp.contextTypes;
    static childContextTypes = Comp.childContextTypes;
    static propTypes = Comp.propTypes;
    static defaultProps = Comp.defaultProps;

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
      devtool && devtool({ type: 'render' })
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
        return false
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

    componentWillUnmount () {
      // call user defined componentWillUnmount
      if (super.componentWillUnmount) {
        super.componentWillUnmount()
      }
      // clean up memory used by easyState
      unobserve(this.render)
    }
  }
}
