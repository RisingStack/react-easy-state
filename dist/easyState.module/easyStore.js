import { observable } from '@nx-js/observer-util';
import autoBind from './autoBind';

export default function easyStore(store) {
  if (typeof store !== 'object' || store === null) {
    throw new TypeError('easyStore expects an object as argument');
  }

  // create an observable object from the passed store
  // and bind all of its methods to the created observable
  const observableStore = observable(store);
  autoBind(observableStore, store, false);
  return observableStore;
}