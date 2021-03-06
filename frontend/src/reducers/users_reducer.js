import { RECEIVE_USERS } from '../actions/user_actions';
import { merge } from 'lodash';

const usersReducer = (state={}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case RECEIVE_USERS:
      return merge({}, newState, action.payload.data);
    default:
      return newState;
  }
};

export default usersReducer;