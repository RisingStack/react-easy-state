import { observable } from '@nx-js/observer-util'
import autoBind from './autoBind'

export default function easyStore (store) {
  const observableStore = observable(store)
  autoBind(observableStore, store, false)
  return observableStore
}
