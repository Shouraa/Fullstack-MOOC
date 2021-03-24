import React from 'react';
import { connect } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const addOne = async (event) => {
    event.preventDefault();
    const anecdote = event.target.newAnecdote.value;
    event.target.newAnecdote.value = '';
    props.addAnecdote(anecdote);
    props.setNotification(`You added ${anecdote}`, 5);
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

export default connect(null, {
  addAnecdote,
  setNotification,
})(AnecdoteForm);
