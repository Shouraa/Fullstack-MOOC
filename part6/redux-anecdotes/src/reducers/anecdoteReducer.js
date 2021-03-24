import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data;
    case 'ADD_VOTE':
      const id = action.data.id;
      const anecdote = state.find((a) => a.id === id);
      const voted = {
        ...anecdote,
        votes: anecdote.votes + 1,
      };
      return state
        .map((a) => (a.id !== id ? a : voted))
        .sort((a, b) => b.votes - a.votes);
    case 'ADD_ANECDOTE':
      return state.concat(action.data);
    default:
      return state;
  }
};

export const incrementVotes = (anecdote) => {
  return async (dispatch) => {
    const changedAnecdote = await anecdoteService.updateAnecdote(
      anecdote.id,
      anecdote
    );
    dispatch({ type: 'ADD_VOTE', data: changedAnecdote });
  };
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content);
    dispatch({ type: 'ADD_ANECDOTE', data: newAnecdote });
  };
};
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export default reducer;
