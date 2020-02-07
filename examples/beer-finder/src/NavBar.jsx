import React from 'react'
import { view } from 'react-easy-state'
import SearchBar from 'material-ui-search-bar'
import LinearProgress from '@material-ui/core/LinearProgress'
import { fetchBeers as handleOnRequestSearch, isLoading } from './appStore'

// this is re-rendered whenever the relevant parts of the used data stores change
export default view(() => (
  <div className='searchbar'>
    <SearchBar
      onRequestSearch={handleOnRequestSearch}
      placeholder='Add some food ...'
      autoFocus
    />
    {isLoading && <LinearProgress />}
  </div>
))
