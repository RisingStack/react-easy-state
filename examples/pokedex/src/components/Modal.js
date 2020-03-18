import React from "react";
import { view } from "react-easy-state";
import pokedex from "../store";
import Attack from "./Attack";
import Type from "./Type";
import Card from "./Card";

export default view(() => {
  if (!pokedex.selectedPokemon) return null;

  const {
    image,
    name,
    weight,
    height,
    types,
    classification,
    resistant,
    weaknesses,
    maxCP,
    maxHP,
    fleeRate,
    evolutions,
    evolutionRequirements,
    attacks
  } = pokedex.selectedPokemon;

  return (
    <div className="modal-container" onClick={() => pokedex.hideModal()}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {pokedex.selectedPokemon && (
          <>
            {pokedex.isSelectedPokemonLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className="modal-header">
                  <img src={image} />
                  <div className="modal-header-content">
                    <h2>{name}</h2>
                    <p>{`max. ${maxCP} CP | max. ${maxHP} HP`}</p>
                    <div className="type-container">
                      {types.map(type => (
                        <Type key={type} type={type} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="modal-table-container">
                  <div className="modal-table">
                    <h3>Basic properties</h3>
                    <p>
                      <b>Classification: </b>
                      {`${classification}`}
                    </p>
                    <p>
                      <b>Weight: </b>
                      {`${weight.minimum} - ${weight.maximum}`}
                    </p>
                    <p>
                      <b>Height: </b>
                      {`${height.minimum} - ${height.maximum}`}
                    </p>
                    <p>
                      <b>Flee rate: </b>
                      {`${fleeRate}`}
                    </p>

                    <div className="modal-type-container">
                      <div className="type-container">
                        <b>Resistancy: </b>
                        {resistant.map(type => (
                          <Type key={type} type={type} />
                        ))}
                      </div>
                    </div>

                    <div className="modal-type-container">
                      <div className="type-container">
                        <b>Weaknesses: </b>
                        {weaknesses.map(type => (
                          <Type key={type} type={type} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="modal-table">
                    {evolutions && (
                      <>
                        <h3>Evolution</h3>
                        <div className="evolution-container">
                          {evolutions.map(item => {
                            console.log(item);
                            return <Card key={item.id} {...item} mini />;
                          })}
                        </div>
                      </>
                    )}
                    {evolutionRequirements && (
                      <p>
                        <b>Evolution requirements: </b>
                        {evolutionRequirements.amount}{" "}
                        {evolutionRequirements.name}
                      </p>
                    )}

                    <h3>Attacks - fast</h3>
                    {attacks.fast.map(attack => (
                      <Attack key={attack.name} attack={attack} />
                    ))}

                    <h3>Attacks - special</h3>
                    {attacks.special.map(attack => (
                      <Attack key={attack.name} attack={attack} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
});
