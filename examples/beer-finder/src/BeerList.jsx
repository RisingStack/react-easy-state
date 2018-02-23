import React from 'react'
import { view } from 'react-easy-state'
import appStore from './appStore'
import Beer from './Beer'

export default view(() => (
  <div className='beerlist'>
    {!appStore.beers.length ? (
      <h3>No matching beers found!</h3>
    ) : (
      appStore.beers.map(beer => <Beer key={beer.name} {...beer} />)
    )}
  </div>
))
