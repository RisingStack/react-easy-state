import React from "react";
import { view } from "react-easy-state";

export default view(evolution => {
  const { image, name } = evolution.evolution;

  return (
    <div className="pokemon-card">
      <img src={image} />
      <h4>{name}</h4>
    </div>
  );
});
