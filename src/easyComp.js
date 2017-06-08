import { observable, observe} from '@nx-js/observer-util'
import autoBind from './autoBind'

const OBSERVED_RENDER = Symbol('observed render')
const IS_DIRECT_RENDER = Symbol('is direct render')
const RENDER_RESULT = Symbol('render result')

export default function easyStateHOC (WrappedComp) {
  if (typeof WrappedComp !== 'function') {
    throw new TypeError('easyComp expects a class component as argument.')
  }

  return class EasyStateWrapper extends WrappedComp {
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
      observe(this[OBSERVED_RENDER])
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
  }
}
