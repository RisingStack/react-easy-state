'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = easyStore;

var _observerUtil = require('@nx-js/observer-util');

var _autoBind = require('./autoBind');

var _autoBind2 = _interopRequireDefault(_autoBind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function easyStore(store) {
  if ((typeof store === 'undefined' ? 'undefined' : _typeof(store)) !== 'object' || store === null) {
    throw new TypeError('easyStore expects an object as argument');
  }

  // create an observable object from the passed store
  // and bind all of its methods to the created observable
  var observableStore = (0, _observerUtil.observable)(store);
  (0, _autoBind2.default)(observableStore, store, false);
  return observableStore;
}