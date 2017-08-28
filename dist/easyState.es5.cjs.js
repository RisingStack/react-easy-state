'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports =
/******/function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/var installedModules = {};
  /******/
  /******/ // The require function
  /******/function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId]) {
      /******/return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };
    /******/
    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, {
        /******/configurable: false,
        /******/enumerable: true,
        /******/get: getter
        /******/ });
      /******/
    }
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {
      return module['default'];
    } :
    /******/function getModuleExports() {
      return module;
    };
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "";
  /******/
  /******/ // Load entry module and return exports
  /******/return __webpack_require__(__webpack_require__.s = 5);
  /******/
}(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["h"] = has;
  /* harmony export (immutable) */__webpack_exports__["f"] = get;
  /* harmony export (immutable) */__webpack_exports__["a"] = add;
  /* harmony export (immutable) */__webpack_exports__["k"] = set;
  /* harmony export (immutable) */__webpack_exports__["c"] = deleteFn;
  /* harmony export (immutable) */__webpack_exports__["b"] = clear;
  /* harmony export (immutable) */__webpack_exports__["e"] = forEach;
  /* harmony export (immutable) */__webpack_exports__["j"] = keys;
  /* harmony export (immutable) */__webpack_exports__["l"] = values;
  /* harmony export (immutable) */__webpack_exports__["d"] = entries;
  /* harmony export (immutable) */__webpack_exports__["i"] = iterator;
  /* harmony export (immutable) */__webpack_exports__["g"] = getSize;
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__observer__ = __webpack_require__(3);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__internals__ = __webpack_require__(1);

  var ITERATE = Symbol('iterate');
  var getPrototypeOf = Object.getPrototypeOf;

  function has(value) {
    var rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this);
    var proto = getPrototypeOf(this);
    if (!rawContext) {
      return proto.has.apply(this, arguments);
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__observer__["d" /* registerObserver */])(rawContext, value);
    return proto.has.apply(rawContext, arguments);
  }

  function get(value) {
    var rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this);
    var proto = getPrototypeOf(this);
    if (!rawContext) {
      return proto.get.apply(this, arguments);
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__observer__["d" /* registerObserver */])(rawContext, value);
    return proto.get.apply(rawContext, arguments);
  }

  function add(value) {
    var rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this);
    var proto = getPrototypeOf(this);
    if (!rawContext) {
      return proto.add.apply(this, arguments);
    }
    if (!proto.has.call(rawContext, value)) {
      Object(__WEBPACK_IMPORTED_MODULE_0__observer__["c" /* queueObservers */])(rawContext, value);
      Object(__WEBPACK_IMPORTED_MODULE_0__observer__["c" /* queueObservers */])(rawContext, ITERATE);
    }
    return proto.add.apply(rawContext, arguments);
  }

  function set(key, value) {
    var rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this);
    var proto = getPrototypeOf(this);
    if (!rawContext) {
      return proto.set.apply(this, arguments);
    }
    if (proto.get.call(rawContext, key) !== value) {
      Object(__WEBPACK_IMPORTED_MODULE_0__observer__["c" /* queueObservers */])(rawContext, key);
      Object(__WEBPACK_IMPORTED_MODULE_0__observer__["c" /* queueObservers */])(rawContext, ITERATE);
    }
    return proto.set.apply(rawContext, arguments);
  }

  function deleteFn(value) {
    var rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this);
    var proto = getPrototypeOf(this);
    if (!rawContext) {
      return proto.delete.apply(this, arguments);
    }
    if (proto.has.call(rawContext, value)) {
      Object(__WEBPACK_IMPORTED_MODULE_0__observer__["c" /* queueObservers */])(rawContext, value);
      Object(__WEBPACK_IMPORTED_MODULE_0__observer__["c" /* queueObservers */])(rawContext, ITERATE);
    }
    return proto.delete.apply(rawContext, arguments);
  }

  function clear() {
    var rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this);
    var proto = getPrototypeOf(this);
    if (!rawContext) {
      return proto.clear.apply(this, arguments);
    }
    if (rawContext.size) {
      Object(__WEBPACK_IMPORTED_MODULE_0__observer__["c" /* queueObservers */])(rawContext, ITERATE);
    }
    return proto.clear.apply(rawContext, arguments);
  }

  function forEach() {
    var rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this);
    var proto = getPrototypeOf(this);
    if (!rawContext) {
      return proto.forEach.apply(this, arguments);
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__observer__["d" /* registerObserver */])(rawContext, ITERATE);
    return proto.forEach.apply(rawContext, arguments);
  }

  function keys() {
    var rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this);
    var proto = getPrototypeOf(this);
    if (!rawContext) {
      return proto.keys.apply(this, arguments);
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__observer__["d" /* registerObserver */])(rawContext, ITERATE);
    return proto.keys.apply(rawContext, arguments);
  }

  function values() {
    var rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this);
    var proto = getPrototypeOf(this);
    if (!rawContext) {
      return proto.values.apply(this, arguments);
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__observer__["d" /* registerObserver */])(rawContext, ITERATE);
    return proto.values.apply(rawContext, arguments);
  }

  function entries() {
    var rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this);
    var proto = getPrototypeOf(this);
    if (!rawContext) {
      return proto.entries.apply(this, arguments);
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__observer__["d" /* registerObserver */])(rawContext, ITERATE);
    return proto.entries.apply(rawContext, arguments);
  }

  function iterator() {
    var rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this);
    var proto = getPrototypeOf(this);
    if (!rawContext) {
      return proto[Symbol.iterator].apply(this, arguments);
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__observer__["d" /* registerObserver */])(rawContext, ITERATE);
    return proto[Symbol.iterator].apply(rawContext, arguments);
  }

  function getSize() {
    var rawContext = __WEBPACK_IMPORTED_MODULE_1__internals__["b" /* proxyToRaw */].get(this);
    var proto = getPrototypeOf(this);
    if (!rawContext) {
      return Reflect.get(proto, 'size', this);
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__observer__["d" /* registerObserver */])(rawContext, ITERATE);
    return Reflect.get(proto, 'size', rawContext);
  }

  /***/
},
/* 1 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  var UNOBSERVED = Symbol('unobserved');
  /* harmony export (immutable) */__webpack_exports__["a"] = UNOBSERVED;

  var proxyToRaw = new WeakMap();
  /* harmony export (immutable) */__webpack_exports__["b"] = proxyToRaw;

  var rawToProxy = new WeakMap();
  /* harmony export (immutable) */__webpack_exports__["c"] = rawToProxy;

  /***/
},
/* 2 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */
  var __WEBPACK_IMPORTED_MODULE_0__observer__ = __webpack_require__(3);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "a", function () {
    return __WEBPACK_IMPORTED_MODULE_0__observer__["a"];
  });
  /* unused harmony reexport isObservable */
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "b", function () {
    return __WEBPACK_IMPORTED_MODULE_0__observer__["b"];
  });
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "c", function () {
    return __WEBPACK_IMPORTED_MODULE_0__observer__["e"];
  });
  /* unused harmony reexport unqueue */
  /* unused harmony reexport exec */

  /***/
},
/* 3 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["b"] = observe;
  /* harmony export (immutable) */__webpack_exports__["e"] = unobserve;
  /* unused harmony export unqueue */
  /* unused harmony export exec */
  /* unused harmony export isObservable */
  /* harmony export (immutable) */__webpack_exports__["a"] = observable;
  /* harmony export (immutable) */__webpack_exports__["d"] = registerObserver;
  /* harmony export (immutable) */__webpack_exports__["c"] = queueObservers;
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__nextTick__ = __webpack_require__(8);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__builtIns_index__ = __webpack_require__(9);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(14);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__internals__ = __webpack_require__(1);

  var ENUMERATE = Symbol('enumerate');
  var queuedObservers = new Set();
  var queued = false;
  var currentObserver = void 0;
  var handlers = { get: get, ownKeys: ownKeys, set: set, deleteProperty: deleteProperty };

  function observe(observer) {
    if (typeof observer !== 'function') {
      throw new TypeError('Observer must be a function.');
    }
    observer[__WEBPACK_IMPORTED_MODULE_3__internals__["a" /* UNOBSERVED */]] = false;
    runObserver(observer);
    return observer;
  }

  function unobserve(observer) {
    queuedObservers.delete(observer);
    observer[__WEBPACK_IMPORTED_MODULE_3__internals__["a" /* UNOBSERVED */]] = true;
    Object(__WEBPACK_IMPORTED_MODULE_2__store__["b" /* releaseObserver */])(observer);
  }

  function unqueue(observer) {
    queuedObservers.delete(observer);
  }

  function exec(observer) {
    runObserver(observer);
  }

  function isObservable(obj) {
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
      throw new TypeError('first argument must be an object');
    }
    return __WEBPACK_IMPORTED_MODULE_3__internals__["b" /* proxyToRaw */].has(obj);
  }

  function observable(obj) {
    obj = obj || {};
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
      throw new TypeError('first argument must be an object or undefined');
    }
    if (__WEBPACK_IMPORTED_MODULE_3__internals__["b" /* proxyToRaw */].has(obj)) {
      return obj;
    }
    return __WEBPACK_IMPORTED_MODULE_3__internals__["c" /* rawToProxy */].get(obj) || instrumentObservable(obj) || createObservable(obj);
  }

  function instrumentObservable(obj) {
    var instrument = __WEBPACK_IMPORTED_MODULE_1__builtIns_index__["a" /* default */].get(Object.getPrototypeOf(obj));
    if (typeof instrument === 'function') {
      instrument(obj);
    }
    if (instrument === false) {
      return obj;
    }
  }

  function createObservable(obj) {
    var observable = new Proxy(obj, handlers);
    Object(__WEBPACK_IMPORTED_MODULE_2__store__["c" /* storeObservable */])(obj);
    __WEBPACK_IMPORTED_MODULE_3__internals__["b" /* proxyToRaw */].set(observable, obj);
    __WEBPACK_IMPORTED_MODULE_3__internals__["c" /* rawToProxy */].set(obj, observable);
    return observable;
  }

  function get(target, key, receiver) {
    var rawTarget = __WEBPACK_IMPORTED_MODULE_3__internals__["b" /* proxyToRaw */].get(target) || target;
    if (key === '$raw') {
      return rawTarget;
    }
    var result = Reflect.get(target, key, receiver);
    if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'symbol' || typeof result === 'function') {
      return result;
    }
    registerObserver(rawTarget, key);
    if (currentObserver && (typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object' && result !== null) {
      return observable(result);
    }
    return __WEBPACK_IMPORTED_MODULE_3__internals__["c" /* rawToProxy */].get(result) || result;
  }

  function registerObserver(target, key) {
    if (currentObserver) {
      Object(__WEBPACK_IMPORTED_MODULE_2__store__["d" /* storeObserver */])(target, key, currentObserver);
    }
  }

  function ownKeys(target) {
    registerObserver(target, ENUMERATE);
    return Reflect.ownKeys(target);
  }

  function set(target, key, value, receiver) {
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {
      value = __WEBPACK_IMPORTED_MODULE_3__internals__["b" /* proxyToRaw */].get(value) || value;
    }
    if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'symbol' || target !== __WEBPACK_IMPORTED_MODULE_3__internals__["b" /* proxyToRaw */].get(receiver)) {
      return Reflect.set(target, key, value, receiver);
    }
    if (key === 'length' || value !== target[key]) {
      queueObservers(target, key);
      queueObservers(target, ENUMERATE);
    }
    return Reflect.set(target, key, value, receiver);
  }

  function deleteProperty(target, key) {
    if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) !== 'symbol' && key in target) {
      queueObservers(target, key);
      queueObservers(target, ENUMERATE);
    }
    return Reflect.deleteProperty(target, key);
  }

  function queueObservers(target, key) {
    if (!queued) {
      Object(__WEBPACK_IMPORTED_MODULE_0__nextTick__["a" /* default */])(runObservers);
      queued = true;
    }
    Object(__WEBPACK_IMPORTED_MODULE_2__store__["a" /* iterateObservers */])(target, key, queueObserver);
  }

  function queueObserver(observer) {
    if (!observer[__WEBPACK_IMPORTED_MODULE_3__internals__["a" /* UNOBSERVED */]]) {
      queuedObservers.add(observer);
    }
  }

  function runObservers() {
    queuedObservers.forEach(runObserver);
    queuedObservers.clear();
    queued = false;
  }

  function runObserver(observer) {
    try {
      currentObserver = observer;
      observer();
    } finally {
      currentObserver = undefined;
    }
  }

  /***/
},
/* 4 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["a"] = autoBind;
  // do not bind these, they should not be directly invoked or passed as callbacks by the user
  var reactInternals = new Set(['constructor', 'render', 'componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount']);

  // bind the methods from proto to the passed context object and assign them to the context
  function autoBind(context, proto, isReact) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.getOwnPropertyNames(proto)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        var value = proto[key];

        if (typeof value === 'function' && !(isReact && reactInternals.has(key))) {
          context[key] = value.bind(context);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  /***/
},
/* 5 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__easyComp__ = __webpack_require__(6);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__easyStore__ = __webpack_require__(15);
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "easyComp", function () {
    return __WEBPACK_IMPORTED_MODULE_0__easyComp__["a"];
  });
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "easyStore", function () {
    return __WEBPACK_IMPORTED_MODULE_1__easyStore__["a"];
  });

  /***/
},
/* 6 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["a"] = easyComp;
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__nx_js_observer_util__ = __webpack_require__(2);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__autoBind__ = __webpack_require__(4);

  var REACTIVE_RENDER = Symbol('reactive render');

  function easyComp(Comp) {
    if (typeof Comp !== 'function') {
      throw new TypeError('easyComp expects a component as argument.');
    }

    // wrap stateless components in a class
    if (isStatelessComp(Comp)) {
      Comp = statelessToStatefulComp(Comp);
    } else if (hasComponentShouldUpdate(Comp)) {
      // shouldComponentUpdate is optimized by easyState, overwriting it would add zero or less value
      throw new Error('easyState optimizes shouldComponentUpdate, do not implement it.');
    }

    return toReactiveComp(Comp);
  }

  function isStatelessComp(Comp) {
    return !(Comp.prototype && Comp.prototype.render) && !__WEBPACK_IMPORTED_MODULE_0_react__["Component"].isPrototypeOf(Comp);
  }

  function statelessToStatefulComp(StatelessComp) {
    var _class, _temp;

    return _temp = _class = function (_WEBPACK_IMPORTED_MO) {
      _inherits(StatefulComp, _WEBPACK_IMPORTED_MO);

      function StatefulComp() {
        _classCallCheck(this, StatefulComp);

        return _possibleConstructorReturn(this, (StatefulComp.__proto__ || Object.getPrototypeOf(StatefulComp)).apply(this, arguments));
      }

      _createClass(StatefulComp, [{
        key: 'render',


        // call the original function component inside the render method

        // proxy react specific static variables to the stateful component
        // from the stateless component
        value: function render() {
          return StatelessComp.call(this, this.props, this.context);
        }
      }]);

      return StatefulComp;
    }(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]), _class.displayName = StatelessComp.displayName || StatelessComp.name, _class.contextTypes = StatelessComp.contextTypes, _class.propTypes = StatelessComp.propTypes, _class.defaultProps = StatelessComp.defaultProps, _temp;
  }

  function hasComponentShouldUpdate(Comp) {
    return typeof Comp.prototype.shouldComponentUpdate === 'function';
  }

  function toReactiveComp(Comp) {
    var _class2, _temp2;

    // return a HOC which overwrites render, shouldComponentUpdate and componentWillUnmount
    // it decides when to run the new reactive methods and when to proxy to the original methods
    return _temp2 = _class2 = function (_Comp) {
      _inherits(EasyHOC, _Comp);

      // proxy react specific static variables to the HOC from the component
      function EasyHOC(props) {
        _classCallCheck(this, EasyHOC);

        // auto bind non react specific original methods to the component instance
        var _this2 = _possibleConstructorReturn(this, (EasyHOC.__proto__ || Object.getPrototypeOf(EasyHOC)).call(this, props));

        Object(__WEBPACK_IMPORTED_MODULE_2__autoBind__["a" /* default */])(_this2, Comp.prototype, true);

        // turn the state into an observable object, which triggers rendering on mutations
        _this2.state = Object(__WEBPACK_IMPORTED_MODULE_1__nx_js_observer_util__["a" /* observable */])(_this2.state);
        return _this2;
      }

      _createClass(EasyHOC, [{
        key: 'render',
        value: function render() {
          var _this3 = this;

          // if it is the first direct render from react call there is no reactive render yet
          if (!this[REACTIVE_RENDER]) {
            var result = void 0;
            // create a reactive render, which is automatically called by easyState on relevant state and store mutations
            // the passed function is executed right away synchronously once by easyState
            this[REACTIVE_RENDER] = Object(__WEBPACK_IMPORTED_MODULE_1__nx_js_observer_util__["b" /* observe */])(function () {
              // if it is the first (synchronous) execution, call the original component's render
              // this is necessary because forceUpdate can not be called synchronously inside render functions
              if (!_this3[REACTIVE_RENDER]) {
                result = _get(EasyHOC.prototype.__proto__ || Object.getPrototypeOf(EasyHOC.prototype), 'render', _this3).call(_this3);
              } else {
                // if it is a later reactive, asynchronous execution - triggered by easyState - forceUpdate the original component
                // this is necessary, because calling render would require the result to be returned
                // which is not possible from this asynchronous context
                _get(EasyHOC.prototype.__proto__ || Object.getPrototypeOf(EasyHOC.prototype), 'forceUpdate', _this3).call(_this3);
              }
            });
            // return the result from super.render() inside the reactive render on the first render execution
            return result;
          } else {
            // return the original component's render result on direct calls from react
            return _get(EasyHOC.prototype.__proto__ || Object.getPrototypeOf(EasyHOC.prototype), 'render', this).call(this);
          }
        }

        // react should trigger updates on prop changes, while easyState handles state changes

      }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
          var props = this.props;

          var keys = Object.keys(props);
          var nextKeys = Object.keys(nextProps);

          // component should update if the number of its props changed
          if (keys.length !== nextKeys.length) {
            return true;
          }

          // component should update if any of its props changed value
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var key = _step2.value;

              if (props[key] !== nextProps[key]) {
                return true;
              }
            }

            // do not let react update the comp otherwise, leave state triggered updates to easyState
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          return false;
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          // clean up memory used by easyState
          Object(__WEBPACK_IMPORTED_MODULE_1__nx_js_observer_util__["c" /* unobserve */])(this[REACTIVE_RENDER]);

          // also call user defined componentWillUnmount to allow the user
          // to clean up additional memory
          if (_get(EasyHOC.prototype.__proto__ || Object.getPrototypeOf(EasyHOC.prototype), 'componentWillUnmount', this)) {
            _get(EasyHOC.prototype.__proto__ || Object.getPrototypeOf(EasyHOC.prototype), 'componentWillUnmount', this).call(this);
          }
        }
      }]);

      return EasyHOC;
    }(Comp), _class2.displayName = Comp.displayName || Comp.name, _class2.contextTypes = Comp.contextTypes, _class2.propTypes = Comp.propTypes, _class2.defaultProps = Comp.defaultProps, _temp2;
  }

  /***/
},
/* 7 */
/***/function (module, exports) {

  module.exports = require("react");

  /***/
},
/* 8 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["a"] = nextTick;
  var promise = Promise.resolve();
  var mutateWithTask = void 0;
  var currTask = void 0;

  function nextTick(task) {
    currTask = task;
    if (mutateWithTask) {
      mutateWithTask();
    } else {
      promise.then(task);
    }
  }

  if (typeof MutationObserver !== 'undefined') {
    var counter = 0;
    var observer = new MutationObserver(onTask);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, { characterData: true });

    mutateWithTask = function mutateWithTask() {
      counter = (counter + 1) % 2;
      textNode.textContent = counter;
    };
  }

  function onTask() {
    if (currTask) {
      currTask();
    }
  }

  /***/
},
/* 9 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */
  var __WEBPACK_IMPORTED_MODULE_0__Map__ = __webpack_require__(10);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__Set__ = __webpack_require__(11);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__WeakMap__ = __webpack_require__(12);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__WeakSet__ = __webpack_require__(13);

  /* harmony default export */__webpack_exports__["a"] = new Map([[Map.prototype, __WEBPACK_IMPORTED_MODULE_0__Map__["a" /* default */]], [Set.prototype, __WEBPACK_IMPORTED_MODULE_1__Set__["a" /* default */]], [WeakMap.prototype, __WEBPACK_IMPORTED_MODULE_2__WeakMap__["a" /* default */]], [WeakSet.prototype, __WEBPACK_IMPORTED_MODULE_3__WeakSet__["a" /* default */]], [Date.prototype, false], [RegExp.prototype, false]]);

  /***/
},
/* 10 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["a"] = instrumentMap;
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__collections__ = __webpack_require__(0);

  function instrumentMap(target) {
    target.has = __WEBPACK_IMPORTED_MODULE_0__collections__["h" /* has */];
    target.get = __WEBPACK_IMPORTED_MODULE_0__collections__["f" /* get */];
    target.set = __WEBPACK_IMPORTED_MODULE_0__collections__["k" /* set */];
    target.delete = __WEBPACK_IMPORTED_MODULE_0__collections__["c" /* deleteFn */];
    target.clear = __WEBPACK_IMPORTED_MODULE_0__collections__["b" /* clear */];
    target.forEach = __WEBPACK_IMPORTED_MODULE_0__collections__["e" /* forEach */];
    target.keys = __WEBPACK_IMPORTED_MODULE_0__collections__["j" /* keys */];
    target.values = __WEBPACK_IMPORTED_MODULE_0__collections__["l" /* values */];
    target.entries = __WEBPACK_IMPORTED_MODULE_0__collections__["d" /* entries */];
    target[Symbol.iterator] = __WEBPACK_IMPORTED_MODULE_0__collections__["i" /* iterator */];
    Object.defineProperty(target, 'size', { get: __WEBPACK_IMPORTED_MODULE_0__collections__["g" /* getSize */] });
  }

  /***/
},
/* 11 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["a"] = instrumentSet;
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__collections__ = __webpack_require__(0);

  function instrumentSet(target) {
    target.has = __WEBPACK_IMPORTED_MODULE_0__collections__["h" /* has */];
    target.add = __WEBPACK_IMPORTED_MODULE_0__collections__["a" /* add */];
    target.delete = __WEBPACK_IMPORTED_MODULE_0__collections__["c" /* deleteFn */];
    target.clear = __WEBPACK_IMPORTED_MODULE_0__collections__["b" /* clear */];
    target.forEach = __WEBPACK_IMPORTED_MODULE_0__collections__["e" /* forEach */];
    target.keys = __WEBPACK_IMPORTED_MODULE_0__collections__["j" /* keys */];
    target.values = __WEBPACK_IMPORTED_MODULE_0__collections__["l" /* values */];
    target.entries = __WEBPACK_IMPORTED_MODULE_0__collections__["d" /* entries */];
    target[Symbol.iterator] = __WEBPACK_IMPORTED_MODULE_0__collections__["i" /* iterator */];
    Object.defineProperty(target, 'size', { get: __WEBPACK_IMPORTED_MODULE_0__collections__["g" /* getSize */] });
  }

  /***/
},
/* 12 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["a"] = instrumentWeakMap;
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__collections__ = __webpack_require__(0);

  function instrumentWeakMap(target) {
    target.has = __WEBPACK_IMPORTED_MODULE_0__collections__["h" /* has */];
    target.get = __WEBPACK_IMPORTED_MODULE_0__collections__["f" /* get */];
    target.set = __WEBPACK_IMPORTED_MODULE_0__collections__["k" /* set */];
    target.delete = __WEBPACK_IMPORTED_MODULE_0__collections__["c" /* deleteFn */];
  }

  /***/
},
/* 13 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["a"] = instrumentWeakSet;
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__collections__ = __webpack_require__(0);

  function instrumentWeakSet(target) {
    target.has = __WEBPACK_IMPORTED_MODULE_0__collections__["h" /* has */];
    target.add = __WEBPACK_IMPORTED_MODULE_0__collections__["a" /* add */];
    target.delete = __WEBPACK_IMPORTED_MODULE_0__collections__["c" /* deleteFn */];
  }

  /***/
},
/* 14 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["c"] = storeObservable;
  /* harmony export (immutable) */__webpack_exports__["d"] = storeObserver;
  /* harmony export (immutable) */__webpack_exports__["a"] = iterateObservers;
  /* harmony export (immutable) */__webpack_exports__["b"] = releaseObserver;
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__internals__ = __webpack_require__(1);

  var observerStore = new WeakMap();

  function storeObservable(target) {
    observerStore.set(target, Object.create(null));
  }

  function storeObserver(target, key, observer) {
    var observers = observerStore.get(target);
    var observersForKey = observers[key];
    if (observersForKey !== observer) {
      if ((typeof observersForKey === 'undefined' ? 'undefined' : _typeof(observersForKey)) === 'object' && observersForKey.size > 0) {
        observersForKey.add(observer);
        observer['_' + key + '_observers'] = observersForKey;
      } else if (typeof observersForKey === 'function' && !observersForKey[__WEBPACK_IMPORTED_MODULE_0__internals__["a" /* UNOBSERVED */]]) {
        observers[key] = new Set().add(observer).add(observersForKey);
      } else {
        observers[key] = observer;
      }
    }
  }

  function iterateObservers(target, key, fn) {
    var observers = observerStore.get(target);
    var observersForKey = observers[key];
    if (observersForKey instanceof Set) {
      observersForKey.forEach(fn);
    } else if (observersForKey) {
      fn(observersForKey);
    }
  }

  function releaseObserver(observer) {
    for (var key in observer) {
      observer[key].delete(observer);
    }
  }

  /***/
},
/* 15 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["a"] = easyStore;
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__nx_js_observer_util__ = __webpack_require__(2);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__autoBind__ = __webpack_require__(4);

  function easyStore(store) {
    if ((typeof store === 'undefined' ? 'undefined' : _typeof(store)) !== 'object' || store === null) {
      throw new TypeError('easyStore expects an object as argument');
    }

    // create an observable object from the passed store
    // and bind all of its methods to the created observable
    var observableStore = Object(__WEBPACK_IMPORTED_MODULE_0__nx_js_observer_util__["a" /* observable */])(store);
    Object(__WEBPACK_IMPORTED_MODULE_1__autoBind__["a" /* default */])(observableStore, store, false);
    return observableStore;
  }

  /***/
}]
/******/);
