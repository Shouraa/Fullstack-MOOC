import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementVotes } from '../reducers/anecdoteReducer';
import {
  setNotification,
  notificationTimeOut,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filterInput }) =>
    anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filterInput.search.toLowerCase())
    )
  );

  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(incrementVotes(id));
    dispatch(setNotification(`You voted '${content}'`));
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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
