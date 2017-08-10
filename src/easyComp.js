import { Component } from 'react'
import { observable, unobserve, observe } from '@nx-js/observer-util'
import autoBind from './autoBind'

const OBSERVED_RENDER = Symbol('observed render')
const IS_DIRECT_RENDER = Symbol('is direct render')
const RENDER_RESULT = Symbol('render result')

export default function easyComp (Comp) {
  if (typeof Comp !== 'function') {
    throw new TypeError('easyComp expects a component as argument.')
  }

  // wrap stateless components in a class
  if (isStatelessComp(Comp)) {
    Comp = statelessToStatefulComp(Comp)
  } else if (hasComponentShouldUpdate(Comp)) {
    // shouldComponentUpdate is optimized by easyState, overwriting it would add zero or less value
    throw new Error('easyState optimizes shouldComponentUpdate, do not implement it.')
  }

  return toReactiveComp(Comp)
}

function isStatelessComp (Comp) {
  return (!(Comp.prototype && Comp.prototype.render) && !Component.isPrototypeOf(Comp))
}

function statelessToStatefulComp (StatelessComp) {
  return class StatefulComp extends Component {
    // proxy react specific static variables to the stateful component
    // from the stateless component
    static displayName = StatelessComp.displayName || StatelessComp.name
    static contextTypes = StatelessComp.contextTypes
    static propTypes = StatelessComp.propTypes
    static defaultProps = StatelessComp.defaultProps

    // call the original function component inside the render method
    render () {
      return StatelessComp.call(this, this.props, this.context)
    }
  }
}

function hasComponentShouldUpdate (Comp) {
  return (typeof Comp.prototype.shouldComponentUpdate === 'function')
}

function toReactiveComp (Comp) {
  // return a HOC which overwrites render, shouldComponentUpdate and componentWillUnmount
  // it decides when to run the new reactive methods and when to proxy to the original methods
  return class EasyHOC extends Comp {
    // proxy react specific static variables to the HOC from the component
    static displayName = Comp.displayName || Comp.name
    static contextTypes = Comp.contextTypes
    static propTypes = Comp.propTypes
    static defaultProps = Comp.defaultProps

    constructor (props) {
      super(props)

      // auto bind non react specific original methods to the component instance
      autoBind(this, Comp.prototype, true)

      // turn the state into an observable object, which triggers rendering on mutations
      this.state = observable(this.state)
    }

    render () {
      if (!this[OBSERVED_RENDER]) {
        this[OBSERVED_RENDER] = () => {
          if (this[IS_DIRECT_RENDER]) {
            this[RENDER_RESULT] = super.render()
          } else {
            super.forceUpdate()
          }
        }
      }

      this[IS_DIRECT_RENDER] = true
      this[OBSERVED_RENDER] = observe(this[OBSERVED_RENDER])
      this[IS_DIRECT_RENDER] = false

      return this[RENDER_RESULT]
    }

    // react should trigger updates on prop changes, while easyState handles state changes
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

      // do not let react update the comp otherwise, leave state triggered updates to easyState
      return false
    }

    componentWillUnmount () {
      // clean up memory used by easyState
      unobserve(this[OBSERVED_RENDER])

      // also call user defined componentWillUnmount to allow the user
      // to clean up additional memory
      if (super.componentWillUnmount) {
        super.componentWillUnmount()
      }
    }
  }
}
