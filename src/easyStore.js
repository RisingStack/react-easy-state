import { observable } from '@nx-js/observer-util'
import autoBind from './autoBind'

export default function easyStore (store) {
  if (typeof store !== 'object') {
    throw new TypeError('easyStore expects an object as argument.')
  }

  const observableStore = observable(store)
  autoBind(observableStore, store, false)
  return observableStore
}
