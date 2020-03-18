import React from "react";
import { view } from "react-easy-state";
import Type from "./Type";
import pokedex from "../store";

export default view(({ id, name, image, classification, types, mini }) => (
  <div
    className={`pokemon-card ${mini && "pokemon-card-mini"}`}
    onClick={() => {
      pokedex.fetchPokemon(id);
      pokedex.showModal();
    }}
  >
    <img src={image} />
    <h2>{name}</h2>
    {!mini && (
      <>
        <p className="classification">{classification}</p>
        <div className="type-container">
          {types.map(type => (
            <Type key={type} type={type} />
          ))}
        </div>
      </>
    )}
  </div>
));
