import { Component } from 'react'
import { observable, observe, unobserve } from '@nx-js/observer-util'
import autoBind from './autoBind'

const REACTIVE_RENDER = Symbol('reactive render')
const DIRECT_RENDER = Symbol('direct render')

export default function easyComp (Comp) {
  if (typeof Comp !== 'function') {
    throw new TypeError('easyComp expects a component as argument.')
  }
  // wrap the component in a reactive HOC
  return toReactiveComp(Comp)
}

function toReactiveComp (Comp) {
  const isStatelessComp = !(Comp.prototype && Comp.prototype.isReactComponent)
  const BaseComp = isStatelessComp ? Component : Comp
  // return a HOC which overwrites render, shouldComponentUpdate and componentWillUnmount
  // it decides when to run the new reactive methods and when to proxy to the original methods
  class ReactiveHOC extends BaseComp {
    state = {
      renderIndicator: false
    }

    constructor (props, context) {
      super(props, context)

      if (!isStatelessComp) {
        // auto bind non react specific original methods to the component instance
        autoBind(this, Comp.prototype, true)

        // turn the store into an observable object, which triggers rendering on mutations
        if (typeof this.store === 'object' && this.store !== null) {
          this.store = observable(this.store)
        } else if (this.store !== undefined) {
          throw new TypeError('component.store must be an object or undefined')
        }
      }

      // create a reactive render for the component
      this.render = observe(this.render, {
        scheduler: () => this.setState({ renderIndicator: !this.state.renderIndicator }),
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
      if (super.shouldComponentUpdate && !super.shouldComponentUpdate(nextProps, nextState)) {
        return false
      }

      // return true if it is a reactive render
      if (state.renderIndicator !== nextState.renderIndicator) {
        return true
      }

      // shallow check if the props changed
      const keys = Object.keys(props)
      const nextKeys = Object.keys(nextProps)

      // component should update if the number of its props changed
      if (keys.length !== nextKeys.length) {
        return true
      }

      // component should update if any of its props changed value
      for (let key of keys) {
        if (props[key] !== nextProps[key]) {
          return true
        }
      }

      // do not let react update the comp otherwise, leave store triggered updates to easyState
      return false
    }

    componentWillUnmount () {
      // call user defined componentWillUnmount
      if (super.componentWillUnmount) {
        super.componentWillUnmount()
      }
      // clean up memory used by easyState
      unobserve(this.render)
      this.store = undefined
    }
  }
  // proxy react specific static variables to the reactive component
  copyStaticProps(Comp, ReactiveHOC)
  return ReactiveHOC
}

// copy react specific static props between passed and HOC components
function copyStaticProps (fromComp, toComp) {
  toComp.displayName = fromComp.displayName || fromComp.name
  toComp.contextTypes = fromComp.contextTypes
  toComp.childContextTypes = fromComp.childContextTypes
  toComp.propTypes = fromComp.propTypes
  toComp.defaultProps = fromComp.defaultProps
}
