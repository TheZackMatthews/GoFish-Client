import { GET_FB_USER } from '../actions/actionTypes'

// user reducer

export const userReducer = (state = '', { type, payload }) => {
  switch (type) {
    case GET_FB_USER:
      return payload;
    default:
      return state;
  }
}