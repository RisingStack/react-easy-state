import React from 'react'
import { view } from 'react-easy-state'
import SearchBar from 'material-ui-search-bar'
import LinearProgress from '@material-ui/core/LinearProgress'
import appStore from './appStore'

// this is re-rendered whenever the relevant parts of the used data stores change
export default view(() => (
  <div className='searchbar'>
    <SearchBar
      onRequestSearch={appStore.fetchBeers}
      placeholder='Add some food ...'
      autoFocus
    />
    {appStore.isLoading && <LinearProgress />}
  </div>
))
