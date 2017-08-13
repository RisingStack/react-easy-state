'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = easyComp;

var _react = require('react');

var _observerUtil = require('@nx-js/observer-util');

var _autoBind = require('./autoBind');

var _autoBind2 = _interopRequireDefault(_autoBind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
  return !(Comp.prototype && Comp.prototype.render) && !_react.Component.isPrototypeOf(Comp);
}

function statelessToStatefulComp(StatelessComp) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    _inherits(StatefulComp, _Component);

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
  }(_react.Component), _class.displayName = StatelessComp.displayName || StatelessComp.name, _class.contextTypes = StatelessComp.contextTypes, _class.propTypes = StatelessComp.propTypes, _class.defaultProps = StatelessComp.defaultProps, _temp;
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

      (0, _autoBind2.default)(_this2, Comp.prototype, true);

      // turn the state into an observable object, which triggers rendering on mutations
      _this2.state = (0, _observerUtil.observable)(_this2.state);
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
          this[REACTIVE_RENDER] = (0, _observerUtil.observe)(function () {
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
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            if (props[key] !== nextProps[key]) {
              return true;
            }
          }

          // do not let react update the comp otherwise, leave state triggered updates to easyState
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

        return false;
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        // clean up memory used by easyState
        (0, _observerUtil.unobserve)(this[REACTIVE_RENDER]);

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