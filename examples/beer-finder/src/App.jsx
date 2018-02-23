import React, { Fragment } from 'react'
import NavBar from './NavBar'
import BeerList from './BeerList'

// if a component does not use any store, it doesn't have to be wrapped with view()
// it is safer to wrap everything with view() until you get more comfortable with Easy State
export default () => (
  <Fragment>
    <NavBar />
    <BeerList />
  </Fragment>
)
