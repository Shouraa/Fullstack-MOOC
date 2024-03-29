const filterReducer = (state = '', action) => {
  console.log('state now: ', state);
  switch (action.type) {
    case 'FILTER_ANECDOTE':
      return action.value;

    default:
      return state;
  }
};

export const filterAnecdote = (value) => {
  return {
    type: 'FILTER_ANECDOTE',
    value,
  };
};

export default filterReducer;
