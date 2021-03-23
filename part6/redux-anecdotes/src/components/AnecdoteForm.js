import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addOne = (event) => {
    event.preventDefault();
    const anecdote = event.target.newAnecdote.value;
    event.target.newAnecdote.value = '';
    dispatch(addAnecdote(anecdote));
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addOne}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
