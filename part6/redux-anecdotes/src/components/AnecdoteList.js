import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { incrementVotes } from '../reducers/anecdoteReducer';

import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  // const anecdotes = useSelector(({ anecdotes, filterInput }) =>

  // );

  // const dispatch = useDispatch();

  const vote = (anecdote) => {
    props.incrementVotes({ ...anecdote, votes: anecdote.votes + 1 });
    props.setNotification(`You voted '${anecdote.content}'`, 5);
  };

  return (
    <div>
      {props.anecdotes.map((anecdote) => (
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(({ content }) =>
      content.toLowerCase().includes(state.filterInput.toLowerCase())
    ),
  };
};

export default connect(mapStateToProps, { incrementVotes, setNotification })(
  AnecdoteList
);
