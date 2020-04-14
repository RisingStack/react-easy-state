declare module '@risingstack/react-easy-state' {
  import { ComponentType, DependencyList } from 'react';

  // takes an object (optionally), wraps it in a transparent proxy and returns the proxy
  function store<Store extends object>(obj?: Store): Store;
  // takes class or function component and returns a class HOC
  function view<Comp extends ComponentType<any>>(comp: Comp): Comp;
  // this runs the passed function and delays all re-renders until the function is finished running
  function batch<T = any>(
    fn: (...args: any[]) => T,
    ctx?: any,
    args?: any[],
  ): T;
  function autoEffect(
    effect: () => void,
    deps?: DependencyList,
  ): () => void | undefined;
  function clearEffect(effect: () => void): void;
}
