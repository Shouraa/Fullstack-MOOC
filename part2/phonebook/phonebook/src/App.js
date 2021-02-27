import React, { useState, useEffect } from "react";
import personService from "./services/persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  useEffect(() => {
    const namesToShow = persons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(namesToShow);
  }, [searchTerm]);

  /* event handler for submitting form */
  const addName = (event) => {
    event.preventDefault();
    /* Checking if the name existed and updating the number in case */
    const existingEntry = persons.find(
      (p) => p.name.toLowerCase() === newName.toLocaleLowerCase()
    );
    if (existingEntry) {
      if (
        window.confirm(
          `${newName} is already in the list. Do you want to update the number?`
        )
      ) {
        existingEntry.number = newNumber;
        personService
          .update(existingEntry.id, existingEntry)
          .then((response) =>
            setPersons(
              persons.map((p) => (p.id !== existingEntry.id ? p : response))
            )
          );
        setNewName("");
        setNewNumber("");
      }
    } else {
      /* adding the new entry */
      const newObject = { name: newName, number: newNumber };
      personService
        .create(newObject)
        .then((response) => setPersons(persons.concat(response)));
      setNewName("");
      setNewNumber("");
    }
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

  /* deleting one name */

  const handleDelete = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch((error) => {
          alert("something went wrong!");
        });
    }
  };

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
      <Persons list={namesList} remove={handleDelete} />
    </div>
  );
};

export default App;
