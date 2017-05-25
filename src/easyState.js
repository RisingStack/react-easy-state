import { observable, observe } from '@nx-js/observer-util'
import autoBind from './autoBind'

const OBSERVED_RENDER = Symbol('observed render')

export default function easyStateHOC (WrappedComp) {
  return class EasyStateWrapper extends WrappedComp {
    constructor (props) {
      super(props)
      autoBind(this, WrappedComp.prototype)
      this.state = observable(this.state)
    }

    render () {
      if (this[OBSERVED_RENDER]) {
        return super.render()
      }

      let result
      this[OBSERVED_RENDER] = observe(() => {
        if (!this[OBSERVED_RENDER]) {
          result = super.render()
        } else {
          super.forceUpdate()
        }
      })
      return result
    }

    shouldComponentUpdate (nextProps) {
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
  }
}
