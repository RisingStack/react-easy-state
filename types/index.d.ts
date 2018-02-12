declare module 'react-easy-state' {
  import { ComponentType } from 'react'

  // takes an object (optionally), wraps it in a transparent proxy and returns the proxy
  function store<Store extends object>(obj?: Store): Store
  // takes class or function component and returns a class HOC
  function view<Comp extends ComponentType<any>>(comp: Comp): Comp
}
