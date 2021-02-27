import React from "react";

import Person from "./Person";

const Persons = ({ list, remove }) => {
  return (
    <ul>
      {list.map((person, i) => (
        <Person key={i} person={person} remove={remove} />
      ))}
    </ul>
  );
};

export default Persons;
