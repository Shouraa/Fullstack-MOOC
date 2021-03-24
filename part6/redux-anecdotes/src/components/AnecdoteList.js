import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementVotes } from '../reducers/anecdoteReducer';
import {
  setNotification,
  notificationTimeOut,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filterInput }) =>
    anecdotes.filter(({ content }) =>
      content.toLowerCase().includes(filterInput.toLowerCase())
    )
  );

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(incrementVotes({ ...anecdote, votes: anecdote.votes + 1 }));
    dispatch(setNotification(`You voted '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(notificationTimeOut());
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
