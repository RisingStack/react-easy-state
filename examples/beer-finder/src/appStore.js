import { store } from 'react-easy-state'
import * as api from './api'

// use 'appStore' instead of 'this' in the store methods to make them passable as callbacks
const appStore = store({
  beers: [],
  async fetchBeers (filter) {
    appStore.isLoading = true
    appStore.beers = await api.fetchBeers(filter)
    appStore.isLoading = false
  }
})

export default appStore
