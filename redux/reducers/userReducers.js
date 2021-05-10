import { LOG_IN, LOG_OUT } from '../actions/actionTypes'

// user reducer

export const userReducer = (state = '', { type, payload }) => {
  switch (type) {
    case LOG_IN:
      return payload;
    case LOG_OUT:
      return '';
    default:
      return state;
  }
}

