const initialState = '';

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    case 'REMOVE_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

let timeoutID;

export const setNotification = (notification, delay) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    });

    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' });
    }, delay * 1000);
  };
};

export default notificationReducer;
