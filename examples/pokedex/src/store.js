import { store } from 'react-easy-state';
import * as api from './api';

export default store({
  isModalOpen: false,
  pokemons: [],
  isPokemonsLoading: true,
  selectedPokemon: null,
  isSelectedPokemonLoading: true,
  async fetchList() {
    this.isPokemonsLoading = true;
    this.pokemons = await api.fetchList();
    this.isPokemonsLoading = false;
  },
  async fetchPokemon(id) {
    this.isSelectedPokemonLoading = true;
    this.selectedPokemon = await api.fetchPokemon(id);
    this.isSelectedPokemonLoading = false;
  },
  hideModal() {
    this.isModalOpen = false;
  },
  showModal() {
    this.isModalOpen = true;
  },
});
