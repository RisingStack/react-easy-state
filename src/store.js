import { observable } from '@nx-js/observer-util'
import autoBind from './autoBind'

export default function store (obj = {}) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('store() expects an object or undefined as argument')
  }
  // create an observable store from the passed object
  // and binds all of its methods to the created observable
  const observableStore = observable(obj)
  autoBind(observableStore, obj, false)
  return observableStore
}
