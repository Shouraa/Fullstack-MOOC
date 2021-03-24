const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'ADD_VOTE':
      const id = action.data.anecdoteId;
      const anecdote = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      };
      return state
        .map((a) => (a.id !== id ? a : changedAnecdote))
        .sort((a, b) => b.votes - a.votes);

    case 'ADD_ANECDOTE':
      return state.concat(action.data);
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export const incrementVotes = (anecdoteId) => {
  return {
    type: 'ADD_VOTE',
    data: { anecdoteId },
  };
};

export const addAnecdote = (data) => {
  return {
    type: 'ADD_ANECDOTE',
    data,
  };
};
export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  };
};

export default reducer;
