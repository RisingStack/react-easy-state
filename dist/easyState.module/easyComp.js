import { Component } from 'react';
import { observable, unobserve, observe } from '@nx-js/observer-util';
import autoBind from './autoBind';

const REACTIVE_RENDER = Symbol('reactive render');

export default function easyComp(Comp) {
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
  return !(Comp.prototype && Comp.prototype.render) && !Component.isPrototypeOf(Comp);
}

function statelessToStatefulComp(StatelessComp) {
  var _class, _temp;

  return _temp = _class = class StatefulComp extends Component {

    // call the original function component inside the render method

    // proxy react specific static variables to the stateful component
    // from the stateless component
    render() {
      return StatelessComp.call(this, this.props, this.context);
    }
  }, _class.displayName = StatelessComp.displayName || StatelessComp.name, _class.contextTypes = StatelessComp.contextTypes, _class.propTypes = StatelessComp.propTypes, _class.defaultProps = StatelessComp.defaultProps, _temp;
}

function hasComponentShouldUpdate(Comp) {
  return typeof Comp.prototype.shouldComponentUpdate === 'function';
}

function toReactiveComp(Comp) {
  var _class2, _temp2;

  // return a HOC which overwrites render, shouldComponentUpdate and componentWillUnmount
  // it decides when to run the new reactive methods and when to proxy to the original methods
  return _temp2 = _class2 = class EasyHOC extends Comp {
    // proxy react specific static variables to the HOC from the component
    constructor(props) {
      super(props);

      // auto bind non react specific original methods to the component instance
      autoBind(this, Comp.prototype, true);

      // turn the state into an observable object, which triggers rendering on mutations
      this.state = observable(this.state);
    }

    render() {
      // if it is the first direct render from react call there is no reactive render yet
      if (!this[REACTIVE_RENDER]) {
        let result;
        // create a reactive render, which is automatically called by easyState on relevant state and store mutations
        // the passed function is executed right away synchronously once by easyState
        this[REACTIVE_RENDER] = observe(() => {
          // if it is the first (synchronous) execution, call the original component's render
          // this is necessary because forceUpdate can not be called synchronously inside render functions
          if (!this[REACTIVE_RENDER]) {
            result = super.render();
          } else {
            // if it is a later reactive, asynchronous execution - triggered by easyState - forceUpdate the original component
            // this is necessary, because calling render would require the result to be returned
            // which is not possible from this asynchronous context
            super.forceUpdate();
          }
        });
        // return the result from super.render() inside the reactive render on the first render execution
        return result;
      } else {
        // return the original component's render result on direct calls from react
        return super.render();
      }
    }

    // react should trigger updates on prop changes, while easyState handles state changes
    shouldComponentUpdate(nextProps) {
      const { props } = this;
      const keys = Object.keys(props);
      const nextKeys = Object.keys(nextProps);

      // component should update if the number of its props changed
      if (keys.length !== nextKeys.length) {
        return true;
      }

      // component should update if any of its props changed value
      for (let key of keys) {
        if (props[key] !== nextProps[key]) {
          return true;
        }
      }

      // do not let react update the comp otherwise, leave state triggered updates to easyState
      return false;
    }

    componentWillUnmount() {
      // clean up memory used by easyState
      unobserve(this[REACTIVE_RENDER]);

      // also call user defined componentWillUnmount to allow the user
      // to clean up additional memory
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }
  }, _class2.displayName = Comp.displayName || Comp.name, _class2.contextTypes = Comp.contextTypes, _class2.propTypes = Comp.propTypes, _class2.defaultProps = Comp.defaultProps, _temp2;
}