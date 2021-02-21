import React, { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  /* event handler for submitting form */
  const addName = (event) => {
    event.preventDefault();
    persons.find((person) => person.name === newName)
      ? window.alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat({ name: newName, number: newNumber }));

    setNewName("");
    setNewNumber("");
  };

  /* event handler for name input */
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  /* event handler for number input */
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  /* event handler for handling search */

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const namesToShow = persons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(namesToShow);
  }, [searchTerm]);

  /* Assigning results conditionally */

  let namesList = [];

  if (searchTerm === "") {
    namesList = [...persons];
  } else {
    namesList = [...searchResults];
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearchInput} value={searchTerm} />
      <h3>add a new</h3>
      <PersonForm
        handleSubmit={addName}
        nameValue={newName}
        numberValue={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons list={namesList} />
    </div>
  );
};

export default App;
