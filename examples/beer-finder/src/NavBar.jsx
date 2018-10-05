import React from 'react'
import { view } from 'react-easy-state'
import SearchBar from 'material-ui-search-bar'
import LinearProgress from '@material-ui/core/LinearProgress'
import appStore from './appStore'

export default view(() => (
  <div className='searchbar'>
    <SearchBar
      onRequestSearch={appStore.fetchBeers}
      placeholder='Some food ...'
    />
    {appStore.isLoading && <LinearProgress />}
  </div>
))
