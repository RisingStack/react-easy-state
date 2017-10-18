import { Component } from 'react'
import { observable, unobserve, observe } from '@nx-js/observer-util'
import autoBind from './autoBind'

const REACTIVE_RENDER = Symbol('reactive render')

export default function easyComp (Comp) {
  if (typeof Comp !== 'function') {
    throw new TypeError('easyComp expects a component as argument.')
  }

  // wrap stateless components in a class
  if (isStatelessComp(Comp)) {
    Comp = statelessToStatefulComp(Comp)
  } else if (hasComponentShouldUpdate(Comp)) {
    // shouldComponentUpdate is optimized by easyState, overwriting it would add zero or less value
    throw new Error(
      'easyState optimizes shouldComponentUpdate, do not implement it.'
    )
  }

  return toReactiveComp(Comp)
}

function isStatelessComp (Comp) {
  return (
    !(Comp.prototype && Comp.prototype.render) && !Component.isPrototypeOf(Comp)
  )
}

function statelessToStatefulComp (StatelessComp) {
  class StatefulComp extends Component {
    // call the original function component inside the render method
    render () {
      return StatelessComp.call(this, this.props, this.context)
    }
  }

  // proxy react specific static variables to the stateful component
  copyStaticProps(StatelessComp, StatefulComp)
  return StatefulComp
}

function hasComponentShouldUpdate (Comp) {
  return typeof Comp.prototype.shouldComponentUpdate === 'function'
}

function toReactiveComp (Comp) {
  // return a HOC which overwrites render, shouldComponentUpdate and componentWillUnmount
  // it decides when to run the new reactive methods and when to proxy to the original methods
  class EasyHOC extends Comp {
    constructor (props) {
      super(props)

      // auto bind non react specific original methods to the component instance
      autoBind(this, Comp.prototype, true)

      // turn the store into an observable object, which triggers rendering on mutations
      if (typeof this.store === 'object' && this.store !== null) {
        this.store = observable(this.store)
      } else if ('store' in this) {
        throw new TypeError('component.store must be an object')
      }
    }

    render () {
      // if it is the first direct render from react call there is no reactive render yet
      if (!this[REACTIVE_RENDER]) {
        let result
        // create a reactive render, which is automatically called by easyState on relevant store mutations
        // the passed function is executed right away synchronously once by easyState
        this[REACTIVE_RENDER] = observe(() => {
          // if it is the first (synchronous) execution, call the original component's render
          // this is necessary because forceUpdate can not be called synchronously inside render functions
          if (!this[REACTIVE_RENDER]) {
            result = super.render()
          } else {
            // if it is a later reactive, asynchronous execution - triggered by easyState - forceUpdate the original component
            // this is necessary, because calling render would require the result to be returned
            // which is not possible from this asynchronous context
            super.forceUpdate()
          }
        })
        // return the result from super.render() inside the reactive render on the first render execution
        return result
      } else {
        // return the original component's render result on direct calls from react
        return super.render()
      }
    }

    // react should trigger updates on prop changes, while easyState handles store changes
    shouldComponentUpdate (nextProps) {
      const { props } = this
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

  // proxy react specific static variables to the HOC from the component
  copyStaticProps(Comp, EasyHOC)
  return EasyHOC
}

// copy react specific static props between passed and HOC components
function copyStaticProps (fromComp, toComp) {
  toComp.displayName = fromComp.displayName || fromComp.name
  toComp.contextTypes = fromComp.contextTypes
  toComp.childContextTypes = fromComp.childContextTypes
  toComp.propTypes = fromComp.propTypes
  toComp.defaultProps = fromComp.defaultProps
}
