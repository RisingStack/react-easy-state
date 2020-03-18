import React from "react";
import { view } from "react-easy-state";
import Type from "./Type";

export const Attack = view(attack => {
  const { name, damage, type } = attack.attack;
  return (
    <div className="attack">
      <div>
        <b>{name}</b>
        <p>Damage: {damage}</p>
      </div>
      <Type type={type} />
    </div>
  );
});

export default Attack;
