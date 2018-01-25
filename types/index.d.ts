declare module 'react-easy-state' {
  import { ComponentType } from 'react'

  // takes an object (optionally), wraps it in a transparent proxy and returns the proxy
  function store<T extends object>(obj?: T): T
  // takes class or function component and returns a class HOC
  function view<C extends ComponentType<any>>(comp: C): C
}
