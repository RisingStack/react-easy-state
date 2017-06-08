/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observer__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__internals__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = has;
/* harmony export (immutable) */ __webpack_exports__["d"] = get;
/* harmony export (immutable) */ __webpack_exports__["b"] = add;
/* harmony export (immutable) */ __webpack_exports__["e"] = set;
/* harmony export (immutable) */ __webpack_exports__["c"] = deleteFn;
/* harmony export (immutable) */ __webpack_exports__["f"] = clear;
/* harmony export (immutable) */ __webpack_exports__["g"] = forEach;
/* harmony export (immutable) */ __webpack_exports__["h"] = keys;
/* harmony export (immutable) */ __webpack_exports__["i"] = values;
/* harmony export (immutable) */ __webpack_exports__["j"] = entries;
/* harmony export (immutable) */ __webpack_exports__["k"] = iterator;
/* harmony export (immutable) */ __webpack_exports__["l"] = getSize;



const ITERATE = Symbol('iterate')
const getPrototypeOf = Object.getPrototypeOf

function has (value) {
  const rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this)
  const proto = getPrototypeOf(this)
  if (!rawContext) {
    return proto.has.apply(this, arguments)
  }
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__observer__["b" /* registerObserver */])(rawContext, value)
  return proto.has.apply(rawContext, arguments)
}

function get (value) {
  const rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this)
  const proto = getPrototypeOf(this)
  if (!rawContext) {
    return proto.get.apply(this, arguments)
  }
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__observer__["b" /* registerObserver */])(rawContext, value)
  return proto.get.apply(rawContext, arguments)
}

function add (value) {
  const rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this)
  const proto = getPrototypeOf(this)
  if (!rawContext) {
    return proto.add.apply(this, arguments)
  }
  if (!proto.has.call(rawContext, value)) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__observer__["c" /* queueObservers */])(rawContext, value)
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__observer__["c" /* queueObservers */])(rawContext, ITERATE)
  }
  return proto.add.apply(rawContext, arguments)
}

function set (key, value) {
  const rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this)
  const proto = getPrototypeOf(this)
  if (!rawContext) {
    return proto.set.apply(this, arguments)
  }
  if (proto.get.call(rawContext, key) !== value) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__observer__["c" /* queueObservers */])(rawContext, key)
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__observer__["c" /* queueObservers */])(rawContext, ITERATE)
  }
  return proto.set.apply(rawContext, arguments)
}

function deleteFn (value) {
  const rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this)
  const proto = getPrototypeOf(this)
  if (!rawContext) {
    return proto.delete.apply(this, arguments)
  }
  if (proto.has.call(rawContext, value)) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__observer__["c" /* queueObservers */])(rawContext, value)
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__observer__["c" /* queueObservers */])(rawContext, ITERATE)
  }
  return proto.delete.apply(rawContext, arguments)
}

function clear () {
  const rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this)
  const proto = getPrototypeOf(this)
  if (!rawContext) {
    return proto.clear.apply(this, arguments)
  }
  if (rawContext.size) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__observer__["c" /* queueObservers */])(rawContext, ITERATE)
  }
  return proto.clear.apply(rawContext, arguments)
}

function forEach () {
  const rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this)
  const proto = getPrototypeOf(this)
  if (!rawContext) {
    return proto.forEach.apply(this, arguments)
  }
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__observer__["b" /* registerObserver */])(rawContext, ITERATE)
  return proto.forEach.apply(rawContext, arguments)
}

function keys () {
  const rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this)
  const proto = getPrototypeOf(this)
  if (!rawContext) {
    return proto.keys.apply(this, arguments)
  }
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__observer__["b" /* registerObserver */])(rawContext, ITERATE)
  return proto.keys.apply(rawContext, arguments)
}

function values () {
  const rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this)
  const proto = getPrototypeOf(this)
  if (!rawContext) {
    return proto.values.apply(this, arguments)
  }
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__observer__["b" /* registerObserver */])(rawContext, ITERATE)
  return proto.values.apply(rawContext, arguments)
}

function entries () {
  const rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this)
  const proto = getPrototypeOf(this)
  if (!rawContext) {
    return proto.entries.apply(this, arguments)
  }
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__observer__["b" /* registerObserver */])(rawContext, ITERATE)
  return proto.entries.apply(rawContext, arguments)
}

function iterator () {
  const rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this)
  const proto = getPrototypeOf(this)
  if (!rawContext) {
    return proto[Symbol.iterator].apply(this, arguments)
  }
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__observer__["b" /* registerObserver */])(rawContext, ITERATE)
  return proto[Symbol.iterator].apply(rawContext, arguments)
}

function getSize () {
  const rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this)
  const proto = getPrototypeOf(this)
  if (!rawContext) {
    return Reflect.get(proto, 'size', this)
  }
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__observer__["b" /* registerObserver */])(rawContext, ITERATE)
  return Reflect.get(proto, 'size', rawContext)
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const UNOBSERVED = Symbol('unobserved')
/* harmony export (immutable) */ __webpack_exports__["a"] = UNOBSERVED;

const proxyToRaw = new WeakMap()
/* harmony export (immutable) */ __webpack_exports__["b"] = proxyToRaw;

const rawToProxy = new WeakMap()
/* harmony export (immutable) */ __webpack_exports__["c"] = rawToProxy;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observer__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__observer__["a"]; });
/* unused harmony reexport isObservable */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__observer__["d"]; });
/* unused harmony reexport unobserve */
/* unused harmony reexport unqueue */
/* unused harmony reexport exec */



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nextTick__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__builtIns_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__internals__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["d"] = observe;
/* unused harmony export unobserve */
/* unused harmony export unqueue */
/* unused harmony export exec */
/* unused harmony export isObservable */
/* harmony export (immutable) */ __webpack_exports__["a"] = observable;
/* harmony export (immutable) */ __webpack_exports__["b"] = registerObserver;
/* harmony export (immutable) */ __webpack_exports__["c"] = queueObservers;





const ENUMERATE = Symbol('enumerate')
const queuedObservers = new Set()
let queued = false
let currentObserver
const handlers = { get, ownKeys, set, deleteProperty }

function observe (observer) {
  if (typeof observer !== 'function') {
    throw new TypeError('Observer must be a function.')
  }
  observer[__WEBPACK_IMPORTED_MODULE_3__internals__["a" /* UNOBSERVED */]] = false
  runObserver(observer)
  return observer
}

function unobserve (observer) {
  queuedObservers.delete(observer)
  observer[__WEBPACK_IMPORTED_MODULE_3__internals__["a" /* UNOBSERVED */]] = true
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__store__["a" /* releaseObserver */])(observer)
}

function unqueue (observer) {
  queuedObservers.delete(observer)
}

function exec (observer) {
  runObserver(observer)
}

function isObservable (obj) {
  if (typeof obj !== 'object') {
    throw new TypeError('first argument must be an object')
  }
  return __WEBPACK_IMPORTED_MODULE_3__internals__["b" /* proxyToRaw */].has(obj)
}

function observable (obj) {
  obj = obj || {}
  if (typeof obj !== 'object') {
    throw new TypeError('first argument must be an object or undefined')
  }
  if (__WEBPACK_IMPORTED_MODULE_3__internals__["b" /* proxyToRaw */].has(obj)) {
    return obj
  }
  return __WEBPACK_IMPORTED_MODULE_3__internals__["c" /* rawToProxy */].get(obj) || instrumentObservable(obj) || createObservable(obj)
}

function instrumentObservable (obj) {
  const instrument = __WEBPACK_IMPORTED_MODULE_1__builtIns_index__["a" /* default */].get(Object.getPrototypeOf(obj))
  if (typeof instrument === 'function') {
    instrument(obj)
  }
  if (instrument === false) {
    return obj
  }
}

function createObservable (obj) {
  const observable = new Proxy(obj, handlers)
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__store__["b" /* storeObservable */])(obj)
  __WEBPACK_IMPORTED_MODULE_3__internals__["b" /* proxyToRaw */].set(observable, obj)
  __WEBPACK_IMPORTED_MODULE_3__internals__["c" /* rawToProxy */].set(obj, observable)
  return observable
}

function get (target, key, receiver) {
  const rawTarget = __WEBPACK_IMPORTED_MODULE_3__internals__["b" /* proxyToRaw */].get(target) || target
  if (key === '$raw') {
    return rawTarget
  }
  const result = Reflect.get(target, key, receiver)
  if (typeof key === 'symbol' || typeof result === 'function') {
    return result
  }
  registerObserver(rawTarget, key)
  if (currentObserver && typeof result === 'object' && result !== null) {
    return observable(result)
  }
  return __WEBPACK_IMPORTED_MODULE_3__internals__["c" /* rawToProxy */].get(result) || result
}

function registerObserver (target, key) {
  if (currentObserver) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__store__["c" /* storeObserver */])(target, key, currentObserver)
  }
}

function ownKeys (target) {
  registerObserver(target, ENUMERATE)
  return Reflect.ownKeys(target)
}

function set (target, key, value, receiver) {
  if (typeof value === 'object' && value !== null) {
    value = __WEBPACK_IMPORTED_MODULE_3__internals__["b" /* proxyToRaw */].get(value) || value
  }
  if (typeof key === 'symbol' || target !== __WEBPACK_IMPORTED_MODULE_3__internals__["b" /* proxyToRaw */].get(receiver)) {
    return Reflect.set(target, key, value, receiver)
  }
  if (key === 'length' || value !== target[key]) {
    queueObservers(target, key)
    queueObservers(target, ENUMERATE)
  }
  return Reflect.set(target, key, value, receiver)
}

function deleteProperty (target, key) {
  if (typeof key !== 'symbol' && (key in target)) {
    queueObservers(target, key)
    queueObservers(target, ENUMERATE)
  }
  return Reflect.deleteProperty(target, key)
}

function queueObservers (target, key) {
  if (!queued) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__nextTick__["a" /* default */])(runObservers)
    queued = true
  }
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__store__["d" /* iterateObservers */])(target, key, queueObserver)
}

function queueObserver (observer) {
  if (!observer[__WEBPACK_IMPORTED_MODULE_3__internals__["a" /* UNOBSERVED */]]) {
    queuedObservers.add(observer)
  }
}

function runObservers () {
  queuedObservers.forEach(runObserver)
  queuedObservers.clear()
  queued = false
}

function runObserver (observer) {
  try {
    currentObserver = observer
    observer()
  } finally {
    currentObserver = undefined
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nx_js_observer_util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__autoBind__ = __webpack_require__(12);
/* harmony export (immutable) */ __webpack_exports__["a"] = easyStateHOC;



const OBSERVED_RENDER = Symbol('observed render')
const IS_DIRECT_RENDER = Symbol('is direct render')
const RENDER_RESULT = Symbol('render result')

function easyStateHOC (WrappedComp) {
  return class EasyStateWrapper extends WrappedComp {
    constructor (props) {
      super(props)
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__autoBind__["a" /* default */])(this, WrappedComp.prototype)
      this.state = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__nx_js_observer_util__["a" /* observable */])(this.state)
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
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__nx_js_observer_util__["b" /* observe */])(this[OBSERVED_RENDER])
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


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collections__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = instrumentMap;


function instrumentMap (target) {
  target.has = __WEBPACK_IMPORTED_MODULE_0__collections__["a" /* has */]
  target.get = __WEBPACK_IMPORTED_MODULE_0__collections__["d" /* get */]
  target.set = __WEBPACK_IMPORTED_MODULE_0__collections__["e" /* set */]
  target.delete = __WEBPACK_IMPORTED_MODULE_0__collections__["c" /* deleteFn */]
  target.clear = __WEBPACK_IMPORTED_MODULE_0__collections__["f" /* clear */]
  target.forEach = __WEBPACK_IMPORTED_MODULE_0__collections__["g" /* forEach */]
  target.keys = __WEBPACK_IMPORTED_MODULE_0__collections__["h" /* keys */]
  target.values = __WEBPACK_IMPORTED_MODULE_0__collections__["i" /* values */]
  target.entries = __WEBPACK_IMPORTED_MODULE_0__collections__["j" /* entries */]
  target[Symbol.iterator] = __WEBPACK_IMPORTED_MODULE_0__collections__["k" /* iterator */]
  Object.defineProperty(target, 'size', { get: __WEBPACK_IMPORTED_MODULE_0__collections__["l" /* getSize */] })
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collections__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = instrumentSet;


function instrumentSet (target) {
  target.has = __WEBPACK_IMPORTED_MODULE_0__collections__["a" /* has */]
  target.add = __WEBPACK_IMPORTED_MODULE_0__collections__["b" /* add */]
  target.delete = __WEBPACK_IMPORTED_MODULE_0__collections__["c" /* deleteFn */]
  target.clear = __WEBPACK_IMPORTED_MODULE_0__collections__["f" /* clear */]
  target.forEach = __WEBPACK_IMPORTED_MODULE_0__collections__["g" /* forEach */]
  target.keys = __WEBPACK_IMPORTED_MODULE_0__collections__["h" /* keys */]
  target.values = __WEBPACK_IMPORTED_MODULE_0__collections__["i" /* values */]
  target.entries = __WEBPACK_IMPORTED_MODULE_0__collections__["j" /* entries */]
  target[Symbol.iterator] = __WEBPACK_IMPORTED_MODULE_0__collections__["k" /* iterator */]
  Object.defineProperty(target, 'size', { get: __WEBPACK_IMPORTED_MODULE_0__collections__["l" /* getSize */] })
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collections__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = instrumentWeakMap;


function instrumentWeakMap (target) {
  target.has = __WEBPACK_IMPORTED_MODULE_0__collections__["a" /* has */]
  target.get = __WEBPACK_IMPORTED_MODULE_0__collections__["d" /* get */]
  target.set = __WEBPACK_IMPORTED_MODULE_0__collections__["e" /* set */]
  target.delete = __WEBPACK_IMPORTED_MODULE_0__collections__["c" /* deleteFn */]
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collections__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = instrumentWeakSet;


function instrumentWeakSet (target) {
  target.has = __WEBPACK_IMPORTED_MODULE_0__collections__["a" /* has */]
  target.add = __WEBPACK_IMPORTED_MODULE_0__collections__["b" /* add */]
  target.delete = __WEBPACK_IMPORTED_MODULE_0__collections__["c" /* deleteFn */]
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Map__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Set__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__WeakMap__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__WeakSet__ = __webpack_require__(8);





/* harmony default export */ __webpack_exports__["a"] = (new Map([
  [Map.prototype, __WEBPACK_IMPORTED_MODULE_0__Map__["a" /* default */]],
  [Set.prototype, __WEBPACK_IMPORTED_MODULE_1__Set__["a" /* default */]],
  [WeakMap.prototype, __WEBPACK_IMPORTED_MODULE_2__WeakMap__["a" /* default */]],
  [WeakSet.prototype, __WEBPACK_IMPORTED_MODULE_3__WeakSet__["a" /* default */]],
  [Date.prototype, false],
  [RegExp.prototype, false]
]));


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = nextTick;
const promise = Promise.resolve()
let mutateWithTask
let currTask

function nextTick (task) {
  currTask = task
  if (mutateWithTask) {
    mutateWithTask()
  } else {
    promise.then(task)
  }
}

if (typeof MutationObserver !== 'undefined') {
  let counter = 0
  const observer = new MutationObserver(onTask)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {characterData: true})

  mutateWithTask = function mutateWithTask () {
    counter = (counter + 1) % 2
    textNode.textContent = counter
  }
}

function onTask () {
  if (currTask) {
    currTask()
  }
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__internals__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["b"] = storeObservable;
/* harmony export (immutable) */ __webpack_exports__["c"] = storeObserver;
/* harmony export (immutable) */ __webpack_exports__["d"] = iterateObservers;
/* harmony export (immutable) */ __webpack_exports__["a"] = releaseObserver;


const observerStore = new WeakMap()

function storeObservable (target) {
  observerStore.set(target, Object.create(null))
}

function storeObserver (target, key, observer) {
  const observers = observerStore.get(target)
  const observersForKey = observers[key]
  if (observersForKey !== observer) {
    if (typeof observersForKey === 'object' && observersForKey.size > 0) {
      observersForKey.add(observer)
      observer[`_${key}_observers`] = observersForKey
    } else if (typeof observersForKey === 'function' && !observersForKey[__WEBPACK_IMPORTED_MODULE_0__internals__["a" /* UNOBSERVED */]]) {
      observers[key] = new Set().add(observer).add(observersForKey)
    } else {
      observers[key] = observer
    }
  }
}

function iterateObservers (target, key, fn) {
  const observers = observerStore.get(target)
  const observersForKey = observers[key]
  if (observersForKey instanceof Set) {
    observersForKey.forEach(fn)
  } else if (observersForKey) {
    fn(observersForKey)
  }
}

function releaseObserver (observer) {
  for (let key in observer) {
    observer[key].delete(observer)
  }
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = autoBind;
const internals = new Set([
  'constructor',
  'render',
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount'
])

function autoBind (context, proto) {
  for (let key of Object.getOwnPropertyNames(proto)) {
    const value = proto[key]

    if (typeof value === 'function' && !internals.has(key)) {
      context[key] = value.bind(context)
    }
  }
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__easyComp__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nx_js_observer_util__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easyComp", function() { return __WEBPACK_IMPORTED_MODULE_0__easyComp__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easyStore", function() { return __WEBPACK_IMPORTED_MODULE_1__nx_js_observer_util__["a"]; });





/***/ })
/******/ ]);