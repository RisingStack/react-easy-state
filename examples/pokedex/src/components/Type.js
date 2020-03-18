import React from "react";

export const Type = type => {
  return (
    <div className={`type type-${type.type.toLowerCase()}`}>
      <p>{type.type}</p>
    </div>
  );
};

export default Type;
