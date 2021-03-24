import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  notificationTimeOut,
} from '../reducers/notificationReducer';

import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addOne = async (event) => {
    event.preventDefault();
    const anecdote = event.target.newAnecdote.value;
    event.target.newAnecdote.value = '';
    const newAnecdote = await anecdoteService.createAnecdote(anecdote);
    dispatch(addAnecdote(newAnecdote));
    dispatch(setNotification(`You added ${anecdote}`));
    setTimeout(() => {
      dispatch(notificationTimeOut());
    }, 5000);
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
