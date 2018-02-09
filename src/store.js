import { observable } from '@nx-js/observer-util'
import autoBind from './autoBind'

export default function store (obj = {}) {
  // create an observable store from the passed object
  // and binds all of its methods to the created observable
  const observableStore = observable(obj)
  autoBind(observableStore, obj, false)
  return observableStore
}
