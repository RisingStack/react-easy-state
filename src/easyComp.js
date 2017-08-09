import { Component } from 'react'
import { observable, unobserve, observe } from '@nx-js/observer-util'
import autoBind from './autoBind'

const OBSERVED_RENDER = Symbol('observed render')
const IS_DIRECT_RENDER = Symbol('is direct render')
const RENDER_RESULT = Symbol('render result')

export default function easyCompHOC (WrappedComp) {
  if (typeof WrappedComp !== 'function') {
    throw new TypeError('easyComp expects a component class or function as argument.')
  }

  if ((!WrappedComp.prototype || !WrappedComp.prototype.render) && !WrappedComp.isReactClass && !Component.isPrototypeOf(WrappedComp)) {
    const renderer = WrappedComp
    WrappedComp = class extends Component {
      render () {
        return renderer.call(this, this.props, this.context)
      }
    }
    WrappedComp.displayName = renderer.displayName || renderer.name
    WrappedComp.contextTypes = renderer.contextTypes
    WrappedComp.propTypes = renderer.propTypes
    WrappedComp.defaultProps = renderer.defaultProps
  }

  return class EasyCompWrapper extends WrappedComp {
    constructor (props) {
      super(props)
      autoBind(this, WrappedComp.prototype, true)
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

    shouldComponentUpdate (nextProps) {
      if (super.shouldComponentUpdate) {
        return super.shouldComponentUpdate()
      }

      const { props } = this
      const keys = Object.keys(props)
      const nextKeys = Object.keys(nextProps)

      if (keys.length !== nextKeys.length) {
        return true
      }

      for (let key of keys) {
        if (props[key] !== nextProps[key]) {
          return true
        }
      }
      return false
    }

    componentWillUnmount () {
      if (super.componentWillUnmount) {
        return super.componentWillUnmount()
      }
      unobserve(this[OBSERVED_RENDER])
    }
  }
}
