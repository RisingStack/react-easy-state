import { store } from 'react-easy-state';
import * as api from './api';

export default store({
  beers: [],
  async fetchBeers(filter) {
    this.isLoading = true;
    this.beers = await api.fetchBeers(filter);
    this.isLoading = false;
  },
});
