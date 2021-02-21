import React from "react";

const Person = (props) => {
  return props.persons.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}
    </p>
  ));
};

export default Person;
