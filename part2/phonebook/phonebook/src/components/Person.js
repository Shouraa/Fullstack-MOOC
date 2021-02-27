import React from "react";

const Person = ({ person, remove }) => {
  return (
    <li>
      <p>
        {person.name} {person.number}{" "}
        <button onClick={() => remove(person)}>delete</button>
      </p>
    </li>
  );
};

export default Person;
