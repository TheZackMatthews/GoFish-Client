import { LOG_IN, LOG_OUT, NEW_USER } from '../actions/actionTypes'

// user reducer

export const userReducer = (state = '', { type, payload }) => {
  switch (type) {
    case LOG_IN:
      return payload;
    case LOG_OUT:
      return '';
    case NEW_USER:
      return payload;
    default:
      return state;
  }
}

