import { store } from "react-easy-state";
import * as api from "./api";

const pokedex = store({
  isModalOpen: false,
  pokemons: [],
  isPokemonsLoading: true,
  selectedPokemon: null,
  isSelectedPokemonLoading: true,
  async fetchList() {
    pokedex.isPokemonsLoading = true;
    pokedex.pokemons = await api.fetchList();
    pokedex.isPokemonsLoading = false;
  },
  async fetchPokemon(id) {
    pokedex.isSelectedPokemonLoading = true;
    pokedex.selectedPokemon = await api.fetchPokemon(id);
    pokedex.isSelectedPokemonLoading = false;
  },
  hideModal() {
    pokedex.isModalOpen = false;
  },
  showModal() {
    pokedex.isModalOpen = true;
  }
});

export default pokedex;
