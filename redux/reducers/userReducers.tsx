import {
  LOG_IN, LOG_OUT, NEW_USER, GET_USER, EDIT_PROFILE, PROFILE_PICTURE, UPDATE_PASSWORD, GET_ADDITIONAL, 
} from '../actions/actionTypes';
import { defaultUser } from '../defaultState';
import { StateUser } from '../../interfaces/state';

interface Action {
  type: string,
  payload: any,
}

// user reducer
const userReducer = (state: StateUser = defaultUser, { type, payload }: Action) => {
  switch (type) {
    case LOG_IN:
      return payload;
    case LOG_OUT:
      return '';
    case NEW_USER:
      return payload;
    case GET_USER:
      return payload;
    case GET_ADDITIONAL:
      return {
        ...state,
        phoneNumber: payload.phone_number,
        totalVisits: payload.total_visits,
      }
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
    case UPDATE_PASSWORD:
      return {
        ...state,
        error: payload,
      }
    default:
      return state;
  }
};

export default userReducer;
