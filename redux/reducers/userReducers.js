import {
  LOG_IN, LOG_OUT, NEW_USER, GET_USER, EDIT_PROFILE, PROFILE_PICTURE,
} from '../actions/actionTypes';

// user reducer
const userReducer = (state = '', { type, payload }) => {
  switch (type) {
    case LOG_IN:
      return payload;
    case LOG_OUT:
      return '';
    case NEW_USER:
      return payload;
    case GET_USER:
      return payload;
    case EDIT_PROFILE:
      return {
        ...state,
        displayName: payload,
      };
    case PROFILE_PICTURE:
      return {
        ...state,
        photoURL: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
