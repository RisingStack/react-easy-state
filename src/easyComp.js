import { Component } from 'react'
import { observable, unobserve, observe } from '@nx-js/observer-util'
import autoBind from './autoBind'

const REACTIVE_RENDER = Symbol('reactive render')
const DIRECT_RENDER = Symbol('direct render')
const RENDER_RESULT = Symbol('render result')

export default function easyComp (Comp) {
  if (typeof Comp !== 'function') {
    throw new TypeError('easyComp expects a component as argument.')
  }
  // wrap the component in a reactive HOC
  return toReactiveComp(Comp)
}

function toReactiveComp (Comp) {
  const isStatelessComp = !Comp.prototype || !Comp.prototype.render
  const BaseComp = isStatelessComp ? Component : Comp
  // return a HOC which overwrites render, shouldComponentUpdate and componentWillUnmount
  // it decides when to run the new reactive methods and when to proxy to the original methods
  class ReactiveHOC extends BaseComp {
    state = {
      renderIndicator: false
    }

    constructor (props, context) {
      super(props, context)

      // auto bind non react specific original methods to the component instance
      if (!isStatelessComp) {
        autoBind(this, Comp.prototype, true)
      }

      // turn the store into an observable object, which triggers rendering on mutations
      if (typeof this.store === 'object' && this.store !== null) {
        this.store = observable(this.store)
      } else if ('store' in this) {
        throw new TypeError('component.store must be an object')
      }
    }

    render () {
      // indicate that render was called directly (by React internals or forceUpdate)
      this[DIRECT_RENDER] = true
      // the render result is null by default
      this[RENDER_RESULT] = null

      if (!this[REACTIVE_RENDER]) {
        // if this is the first render call for this comp, create a reactive render
        // this will be called automatically whenever relevant state changes, which causes a new UI
        this[REACTIVE_RENDER] = observe(this.reactiveRender.bind(this))
      } else {
        // call the existing reactive render
        this[REACTIVE_RENDER]()
      }

      // indicate that the direct render is over, so that later reactive renders will work correctly
      this[DIRECT_RENDER] = false
      return this[RENDER_RESULT]
    }

    reactiveRender () {
      if (this[DIRECT_RENDER]) {
        // if render was called directly (by React or forceUpdate) get and save the next view
        this[RENDER_RESULT] = isStatelessComp ? Comp(this.props, this.context) : super.render()
      } else {
        // if render was called automatically because of store changes
        // trigger a react render (which results in a direct render later)
        this.setState({ renderIndicator: !this.state.renderIndicator })
      }
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
      // clean up memory used by easyState
      unobserve(this[REACTIVE_RENDER])

      // also call user defined componentWillUnmount to allow the user
      // to clean up additional memory
      if (super.componentWillUnmount) {
        super.componentWillUnmount()
      }
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
