/* eslint-disable react/forbid-foreign-prop-types */
/* eslint-disable no-multi-assign */
import { Component } from 'react';
// eslint-disable-next-line import/no-unresolved
import { view } from 'react-easy-state';

describe('static props', () => {
  test('view() should proxy static properties from wrapped components', () => {
    class Comp extends Component {}
    function FuncComp() {}

    Comp.displayName = FuncComp.displayName = 'Name';
    Comp.contextTypes = FuncComp.contextTypes = {};
    Comp.propTypes = FuncComp.propTypes = {};
    Comp.defaultProps = FuncComp.defaultProps = {};
    Comp.customProp = FuncComp.customProp = {};

    const ViewComp = view(Comp);
    const ViewFuncComp = view(FuncComp);

    expect(ViewComp.displayName).toBe(Comp.displayName);
    expect(ViewComp.contextTypes).toBe(Comp.contextTypes);
    expect(ViewComp.propTypes).toBe(Comp.propTypes);
    expect(ViewComp.defaultProps).toBe(Comp.defaultProps);
    expect(ViewComp.customProp).toBe(Comp.customProp);

    expect(ViewFuncComp.displayName).toBe(FuncComp.displayName);
    expect(ViewFuncComp.contextTypes).toBe(FuncComp.contextTypes);
    expect(ViewFuncComp.propTypes).toBe(FuncComp.propTypes);
    expect(ViewFuncComp.defaultProps).toBe(FuncComp.defaultProps);
    expect(ViewFuncComp.customProp).toBe(FuncComp.customProp);
  });

  test('view() should proxy static methods', () => {
    class Comp extends Component {
      static getDerivedStateFromError() {}

      static customMethod() {}
    }

    const ViewComp = view(Comp);
    expect(ViewComp.getDerivedStateFromError).toBe(
      Comp.getDerivedStateFromError,
    );
    expect(ViewComp.customMethod).toBe(Comp.customMethod);
  });

  test('view() should proxy static getters', () => {
    class Comp extends Component {
      static get defaultProp() {
        return { key: 'value' };
      }

      static get customProp() {
        return { key: 'hello' };
      }
    }

    const ViewComp = view(Comp);
    expect(ViewComp.defaultProps).toEqual(Comp.defaultProps);
    expect(ViewComp.customProp).toEqual(Comp.customProp);
  });
});
