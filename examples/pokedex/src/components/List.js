import React from "react";
import { view } from "react-easy-state";
import pokedex from "../store";
import Card from "./Card";

export default view(() => {
  return (
    <>
      {pokedex.pokemons.map(pokemon => (
        <Card key={pokemon.id} {...pokemon} />
      ))}
    </>
  );
});
